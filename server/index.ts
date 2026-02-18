import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { applySecurityHeaders } from "./security-headers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Parse JSON bodies with size limit
  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ limit: "10kb", extended: true }));

  // Apply security headers to all responses
  app.use((req, res, next) => {
    applySecurityHeaders(res);
    next();
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Secure consultation form endpoint
  app.post("/api/consultation", (req, res) => {
    try {
      const { fullName, company, email, phone, message } = req.body;

      // Validate required fields
      if (!fullName || !company || !email || !phone || !message) {
        return res.status(400).json({
          success: false,
          message: "All fields are required"
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email address"
        });
      }

      // In production, you would:
      // 1. Store this in a database with encryption
      // 2. Send a confirmation email
      // 3. Log the submission securely
      // 4. Implement rate limiting
      // 5. Add CSRF token validation

      console.log("[SECURE] Consultation request received:", {
        timestamp: new Date().toISOString(),
        email: email.substring(0, 3) + "***" // Log partially masked email
      });

      // Return success response
      res.json({
        success: true,
        message: "Your consultation request has been received securely."
      });
    } catch (error) {
      console.error("[ERROR] Consultation endpoint error:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred processing your request"
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      secure: process.env.NODE_ENV === "production"
    });
  });

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
