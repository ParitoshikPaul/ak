# Payment Integration Guide

## Online Payment Setup for Ambika Kapoor Makeup Studio

Your website is ready for online payments! Here's how to integrate popular Indian payment gateways.

## Recommended Payment Gateways for India

### 1. Razorpay (Most Popular) ⭐ RECOMMENDED

**Why Razorpay:**
- Easiest to integrate
- Supports UPI, Cards, Net Banking, Wallets
- No setup fee
- 2% transaction fee
- Instant settlements
- Great for small businesses

**Setup Steps:**

1. **Create Account**
   - Go to https://razorpay.com
   - Sign up with business details
   - Complete KYC (Aadhaar + PAN)
   - Get approved (1-2 days)

2. **Get API Keys**
   - Login to Dashboard
   - Go to Settings → API Keys
   - Generate Test Keys (for testing)
   - Generate Live Keys (for production)

3. **Add Razorpay Script to Website**

   Add this to your `index.html` before `</body>`:
   ```html
   <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
   ```

4. **Update JavaScript**

   In `script.js`, uncomment the Razorpay code (lines 235-256) and add your key:

   ```javascript
   function processPayment(data, method) {
       // Calculate amount based on package
       const amounts = {
           'bridal-classic': 60000,
           'bridal-premium': 85000,
           'bridal-complete': 120000,
           'party': 8000,
           'engagement': 12000,
           'photoshoot': 10000,
           'formal': 7000,
           'devotional': 6000,
           'trial': 5000
       };

       let amount = amounts[data.packageType] || 10000;

       // If advance payment (30%)
       if (method === 'online') {
           amount = Math.floor(amount * 0.30);
       }

       // If full payment with 5% discount
       if (method === 'full-online') {
           amount = Math.floor(amount * 0.95);
       }

       var options = {
           "key": "rzp_live_YOUR_KEY_HERE", // Replace with your key
           "amount": amount * 100, // Amount in paise
           "currency": "INR",
           "name": "Ambika Kapoor Makeup Studio",
           "description": data.packageType,
           "image": "https://yourwebsite.com/logo.png",
           "handler": function (response){
               // Payment successful
               sendBookingToServer(data, response.razorpay_payment_id);
               showBookingConfirmation(data);
           },
           "prefill": {
               "name": data.name,
               "email": data.email,
               "contact": data.phone
           },
           "theme": {
               "color": "#FFB6C1"
           }
       };

       var rzp1 = new Razorpay(options);
       rzp1.on('payment.failed', function (response){
           alert('Payment failed. Please try again.');
       });
       rzp1.open();
   }
   ```

### 2. PayU

**Why PayU:**
- Good for established businesses
- Lower transaction fees (1.99%)
- Multiple payment options

**Setup:**
1. Visit https://payu.in
2. Create merchant account
3. Complete KYC
4. Integrate using their SDK

### 3. Paytm for Business

**Why Paytm:**
- Well-known brand
- Easy UPI integration
- Good for local customers

**Setup:**
1. Download Paytm for Business app
2. Create merchant account
3. Use Payment Gateway integration

### 4. Instamojo

**Why Instamojo:**
- No setup cost
- 2% + ₹3 per transaction
- Very simple integration
- Good for beginners

**Setup:**
1. Visit https://www.instamojo.com
2. Create account
3. Use Payment Links (easiest) or API

## Backend Integration (Required for Production)

For production, you need a backend server to:
1. Create payment orders securely
2. Verify payment signatures
3. Store booking details
4. Send confirmation emails

### Simple Backend Options:

**Option 1: Google Sheets + Google Apps Script** (Free, No Coding)
1. Create Google Sheet for bookings
2. Use Google Apps Script to handle form submissions
3. Use Razorpay Payment Links

**Option 2: Firebase (Free tier available)**
1. Use Firebase Functions for backend
2. Firebase Firestore for database
3. Easy integration with website

**Option 3: Node.js Server** (Recommended for developers)
```javascript
// server.js example
const Razorpay = require('razorpay');
const express = require('express');
const app = express();

const razorpay = new Razorpay({
    key_id: 'YOUR_KEY_ID',
    key_secret: 'YOUR_KEY_SECRET'
});

app.post('/create-order', async (req, res) => {
    const options = {
        amount: req.body.amount * 100,
        currency: 'INR',
        receipt: 'order_' + Date.now()
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
});

app.post('/verify-payment', (req, res) => {
    // Verify payment signature
    // Save booking to database
    // Send confirmation email
    res.json({ success: true });
});
```

## Quick Start (No Backend Needed)

### Use Razorpay Payment Links

1. Login to Razorpay Dashboard
2. Go to Payment Pages → Payment Links
3. Create links for each package:
   - Classic Bridal: ₹60,000
   - Premium Bridal: ₹85,000
   - Complete Bridal: ₹1,20,000

4. Update your HTML to use these links:
```html
<a href="YOUR_RAZORPAY_PAYMENT_LINK" class="package-button">Pay Now</a>
```

## Testing

Before going live:

1. **Test Mode:**
   - Use Razorpay Test Keys
   - Test card: 4111 1111 1111 1111
   - CVV: Any 3 digits
   - Expiry: Any future date

2. **Test All Scenarios:**
   - Successful payment
   - Failed payment
   - Different payment methods (UPI, Card, Net Banking)

## Security Checklist

- [ ] Never expose API Secret Key in frontend
- [ ] Always verify payment on server
- [ ] Use HTTPS (SSL certificate)
- [ ] Implement payment signature verification
- [ ] Store sensitive data securely
- [ ] Enable 2FA on payment gateway account

## Recommended Setup for You

**Easiest Path (30 minutes):**
1. Sign up for Razorpay
2. Create Payment Links for each package
3. Update "Book Now" buttons with payment links
4. Use Google Forms to collect booking details
5. Manually confirm bookings via phone

**Full Integration (Requires Developer):**
1. Set up Razorpay account
2. Create backend server (Node.js/Firebase)
3. Implement full payment flow
4. Add database for bookings
5. Set up automated emails
6. Add admin panel

## Costs Breakdown

**Transaction Fees:**
- Razorpay: 2% per transaction
- PayU: 1.99% per transaction
- Paytm: 1.99% per transaction
- Instamojo: 2% + ₹3 per transaction

**Example for ₹60,000 booking:**
- Customer pays: ₹60,000
- Razorpay fee: ₹1,200 (2%)
- You receive: ₹58,800

**Settlement Time:**
- Razorpay: T+3 days (instant available at 1% extra)
- PayU: T+2 days
- Paytm: T+2 days

## Support & Resources

**Razorpay:**
- Docs: https://razorpay.com/docs/
- Support: support@razorpay.com
- Phone: 022-62501234

**For Help:**
- Razorpay has live chat support
- Check their integration docs
- Join their developer community

## Next Steps

1. Choose your payment gateway (Razorpay recommended)
2. Create account and complete KYC
3. Decide: Payment Links (easy) or Full Integration (advanced)
4. Test thoroughly before going live
5. Update your website with real payment credentials

---

**Need developer help?**
You can hire a freelance developer on:
- Fiverr
- Upwork
- Freelancer.com

Search for: "Razorpay integration" or "Payment gateway integration India"
Expected cost: ₹2,000 - ₹10,000 for basic integration

Good luck with your online bookings! 💄✨
