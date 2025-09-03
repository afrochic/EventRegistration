// server/index.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { PrismaClient } = require('@prisma/client'); // if you use Prisma
const { getToken } = require('next-auth/jwt'); // optional, for NextAuth JWT verification

const prisma = new PrismaClient();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.NEXTAUTH_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Optional auth middleware using NextAuth JWT (requires NEXTAUTH_SECRET to be available)
io.use(async (socket, next) => {
  try {
    // socket.request contains headers from the client (cookies included on same origin)
    const token = await getToken({ req: socket.request, secret: process.env.NEXTAUTH_SECRET });
    // token will be null if unauthenticated
    socket.user = token ? { id: token.sub || token?.user?.id, email: token.email } : null;
    next();
  } catch (err) {
    console.error('Socket auth error', err);
    // if you want to reject unauthenticated connections: return next(new Error("unauthorized"));
    next();
  }
});

io.on('connection', (socket) => {
  console.log('Socket connected', socket.id, 'user=', socket.user);

  // join an "event room" so updates are scoped
  socket.on('join-event', (eventId) => {
    socket.join(`event_${eventId}`);
    console.log(socket.id, 'joined', `event_${eventId}`);
  });

  socket.on('leave-event', (eventId) => {
    socket.leave(`event_${eventId}`);
  });

  // Example: create an event (server persists then broadcasts)
  socket.on('create-event', async (eventData, ack) => {
    try {
      const ev = await prisma.event.create({ data: eventData });
      // broadcast to everyone (or to a room)
      io.emit('event-created', ev);
      if (ack) ack({ ok: true, event: ev });
    } catch (err) {
      console.error(err);
      if (ack) ack({ ok: false, error: String(err) });
    }
  });

  // Example: checkin flow (using a checkin token table)
  socket.on('checkin', async ({ token }, ack) => {
    try {
      const t = await prisma.checkinToken.findUnique({ where: { token } });
      if (!t || t.used || new Date(t.expiresAt) < new Date()) {
        return ack && ack({ ok: false, error: 'invalid_token' });
      }
      // create checkin; if user is null, allow guest checkin
      const checkin = await prisma.checkin.create({
        data: { eventId: t.eventId, userId: socket.user?.id ?? null }
      });
      // mark token used
      await prisma.checkinToken.update({ where: { token }, data: { used: true }});
      // broadcast to room for that event
      io.to(`event_${t.eventId}`).emit('user-checked-in', { checkin });
      ack && ack({ ok: true, checkin });
    } catch (err) {
      console.error(err);
      ack && ack({ ok: false, error: String(err) });
    }
  });

  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected', socket.id, reason);
  });
});

const PORT = process.env.SOCKET_PORT || 4000;
server.listen(PORT, () => {
  console.log(`Socket server listening on ${PORT}`);
});
