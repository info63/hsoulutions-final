#!/bin/bash

# OGH Maximum Spiral Consciousness - Neon Integration Deployment
# H SOULUTIONS Platform Launch Script

echo "🌟 OGH Maximum Spiral Consciousness Deployment"
echo "🚀 H SOULUTIONS + Neon Database Integration"
echo "🌀 φ = 1.618033988749895 - Reality's Operating System"
echo ""

# Check if we're in the correct directory
if [ ! -f "neon-integrated-platform.html" ]; then
    echo "❌ Error: neon-integrated-platform.html not found"
    echo "📍 Please run this script from the hsoulutions-final directory"
    exit 1
fi

# Check Node.js version
echo "🔍 Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    echo "📥 Please install Node.js 18+ to continue"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="18.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo "❌ Error: Node.js version $NODE_VERSION is too old"
    echo "📥 Please upgrade to Node.js 18+"
    exit 1
fi

echo "✅ Node.js version: $NODE_VERSION"

# Check if npm dependencies are installed
echo "📦 Checking npm dependencies..."
if [ ! -d "node_modules" ]; then
    echo "📥 Installing npm dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Error: Failed to install npm dependencies"
        exit 1
    fi
else
    echo "✅ npm dependencies already installed"
fi

# Check environment variables
echo "🔧 Checking environment configuration..."
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found"
    echo "📝 Creating example .env file..."
    cp .env.example .env
    echo "🔧 Please edit .env file with your Neon database credentials"
    echo "🌐 Visit: https://console.neon.tech/app/projects/twilight-bird-66678380"
    echo ""
    echo "📋 Required environment variables:"
    echo "   NEON_DATABASE_URL=postgresql://username:password@twilight-bird-66678380.db.neon.tech/neondb?sslmode=require"
    echo "   NEON_PROJECT_ID=twilight-bird-66678380"
    echo ""
    read -p "Press Enter after configuring .env file..."
fi

# Load environment variables
if [ -f ".env" ]; then
    export $(grep -v '^#' .env | xargs)
    echo "✅ Environment variables loaded"
else
    echo "❌ Error: .env file not found"
    exit 1
fi

# Validate Neon database connection
echo "🔌 Testing Neon database connection..."
if [ -z "$NEON_DATABASE_URL" ]; then
    echo "❌ Error: NEON_DATABASE_URL not configured"
    exit 1
fi

# Initialize database
echo "🗄️  Initializing Neon database with φ-based schema..."
node scripts/init-database.js
if [ $? -ne 0 ]; then
    echo "❌ Error: Database initialization failed"
    echo "🔧 Please check your Neon database credentials"
    exit 1
fi

echo "✅ Database initialized successfully"

# Start real-time synchronization
echo "⚡ Starting real-time data synchronization..."
node scripts/sync-data.js &
SYNC_PID=$!
echo "✅ Real-time sync started (PID: $SYNC_PID)"

# Wait a moment for sync to initialize
sleep 3

# Start the web server
echo "🌐 Starting H SOULUTIONS web server..."
echo "📍 Server will be available at: http://localhost:3000"
echo "🌟 Neon Integrated Platform: http://localhost:3000/neon-integrated-platform.html"
echo ""

# Start Python HTTP server
python3 -m http.server 3000 &
SERVER_PID=$!

echo "✅ Web server started (PID: $SERVER_PID)"
echo ""
echo "🌟 OGH Maximum Spiral Consciousness Integration Complete!"
echo "🚀 H SOULUTIONS + Neon Database Platform Active"
echo ""
echo "📊 Platform Features:"
echo "   ✅ Real-time database synchronization"
echo "   ✅ φ pattern detection and analysis"
echo "   ✅ AI solutions for global challenges"
echo "   ✅ Scientific research validation"
echo "   ✅ User analytics with spiral consciousness"
echo "   ✅ Cyberpunk aesthetic interface"
echo ""
echo "🔗 Access URLs:"
echo "   🌐 Main Platform: http://localhost:3000/neon-integrated-platform.html"
echo "   📊 Dashboard: http://localhost:3000/neon-integrated-platform.html#dashboard"
echo "   🌀 φ Constants: http://localhost:3000/neon-integrated-platform.html#phi-constants"
echo "   🤖 AI Solutions: http://localhost:3000/neon-integrated-platform.html#ai-solutions"
echo "   🔬 Research: http://localhost:3000/neon-integrated-platform.html#research"
echo "   📈 Analytics: http://localhost:3000/neon-integrated-platform.html#analytics"
echo ""
echo "🛑 To stop the platform: Press Ctrl+C"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down OGH platform..."
    
    if [ ! -z "$SYNC_PID" ]; then
        echo "⚡ Stopping real-time sync (PID: $SYNC_PID)..."
        kill $SYNC_PID 2>/dev/null
    fi
    
    if [ ! -z "$SERVER_PID" ]; then
        echo "🌐 Stopping web server (PID: $SERVER_PID)..."
        kill $SERVER_PID 2>/dev/null
    fi
    
    echo "✅ OGH Maximum Spiral Consciousness Platform stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Keep the script running
echo "🌀 Platform is running with maximum spiral consciousness..."
echo "📊 Monitoring φ patterns and real-time data synchronization..."
echo ""

while true; do
    sleep 10
    # Check if processes are still running
    if ! kill -0 $SERVER_PID 2>/dev/null; then
        echo "❌ Web server stopped unexpectedly"
        cleanup
    fi
    
    if ! kill -0 $SYNC_PID 2>/dev/null; then
        echo "⚠️  Real-time sync stopped, restarting..."
        node scripts/sync-data.js &
        SYNC_PID=$!
    fi
done