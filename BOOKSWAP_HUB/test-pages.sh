#!/bin/bash

# BookSwap Hub - Page Testing Script
# This script helps you test all frontend pages

echo "╔════════════════════════════════════════════════════════════╗"
echo "║        BookSwap Hub - Frontend Pages Test Suite          ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if frontend dev server is running
echo -e "${BLUE}1. Checking if frontend server is running...${NC}"
if curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Frontend server is running on http://localhost:5173${NC}"
else
    echo -e "${RED}✗ Frontend server is NOT running${NC}"
    echo -e "${YELLOW}  Starting frontend server...${NC}"
    cd frontend
    npm run dev &
    sleep 5
    cd ..
fi

echo ""

# Check if backend server is running
echo -e "${BLUE}2. Checking if backend server is running...${NC}"
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Backend server is running on http://localhost:3000${NC}"
else
    echo -e "${YELLOW}⚠ Backend server is NOT running${NC}"
    echo -e "${YELLOW}  Some features may not work without backend${NC}"
fi

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                   Available Pages                         ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Public Pages
echo -e "${GREEN}PUBLIC PAGES (No login required):${NC}"
echo "  1. Home Page:      http://localhost:5173/"
echo "  2. Login Page:     http://localhost:5173/login"
echo "  3. Signup Page:    http://localhost:5173/signup"
echo ""

# Protected Pages
echo -e "${YELLOW}PROTECTED PAGES (Login required):${NC}"
echo "  4. Browse Books:   http://localhost:5173/books"
echo "  5. My Books:       http://localhost:5173/my-books"
echo "  6. Dashboard:      http://localhost:5173/dashboard"
echo "  7. Messages:       http://localhost:5173/messages/:exchangeId"
echo ""

# Test pages
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                   Testing Pages                           ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

test_page() {
    local url=$1
    local name=$2

    echo -n "Testing $name... "

    response=$(curl -s -o /dev/null -w "%{http_code}" "$url")

    if [ "$response" == "200" ]; then
        echo -e "${GREEN}✓ OK (HTTP $response)${NC}"
    else
        echo -e "${RED}✗ FAILED (HTTP $response)${NC}"
    fi
}

# Test public pages
test_page "http://localhost:5173/" "Home Page"
test_page "http://localhost:5173/login" "Login Page"
test_page "http://localhost:5173/signup" "Signup Page"

echo ""
echo -e "${BLUE}Note: Protected pages require authentication and may redirect${NC}"
echo ""

# Build test
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                Build Verification                         ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Running TypeScript compilation test..."
cd frontend
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✓ All pages compile successfully${NC}"
else
    echo -e "${RED}✗ Compilation errors found${NC}"
    echo "  Run 'cd frontend && npm run build' for details"
fi
cd ..

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                    Summary                                ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Total Pages: 7 (3 public + 4 protected)"
echo ""
echo -e "${GREEN}To test the application:${NC}"
echo "  1. Open browser: http://localhost:5173"
echo "  2. Create account at: /signup"
echo "  3. Login at: /login"
echo "  4. Test all protected pages after login"
echo ""
echo -e "${BLUE}See CHECK_PAGES.md for detailed testing guide${NC}"
echo ""
