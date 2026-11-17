const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { sequelize } = require('./models');
const setupSwagger = require('./swagger/swagger');

const adminRoutes = require('./routes/adminRoute');
const countryRoutes = require('./routes/countryRoute');
const genderRoutes = require('./routes/genderRoute');
const flatRoutes = require('./routes/flatRoute');
const sectorRoutes = require('./routes/sectorRoute');
const seatTypeRoutes = require('./routes/seatTypeRoute');
const ticketTypeRoutes = require('./routes/ticketTypeRoute');
const ticketStatusRoutes = require('./routes/ticketStatusRoute');
const paymentMethodRoutes = require('./routes/paymentMethodRoute');
const deliveryMethodRoutes = require('./routes/deliveryMethodRoute');
const discountRoutes = require('./routes/discountRoute');
const langRoutes = require('./routes/langRoute');
const typesRoutes = require('./routes/typesRoute');
const regionRoutes = require('./routes/regionRoute');
const districtRoutes = require('./routes/districtRoute');
const humanCategoryRoutes = require('./routes/humanCategoryRoute');
const eventTypeRoutes = require('./routes/eventTypeRoute');
const venueRoutes = require('./routes/venueRoute');
const venueTypesRoutes = require('./routes/venueTypesRoute');
const venuePhotoRoutes = require('./routes/venuePhotoRoute');
const seatRoutes = require('./routes/seatRoute');
const eventRoutes = require('./routes/eventRoute');
const customerRoutes = require('./routes/customerRoute');
const customerCardRoutes = require('./routes/customerCardRoute');
const customerAddressRoutes = require('./routes/customerAddressRoute');
const ticketRoutes = require('./routes/ticketRoute');
const cartRoutes = require('./routes/cartRoute');
const cartItemRoutes = require('./routes/cartItemRoute');
const bookingRoutes = require('./routes/bookingRoute');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
}));

// API Routes
app.use('/api', adminRoutes);
app.use('/api', countryRoutes);
app.use('/api', genderRoutes);
app.use('/api', flatRoutes);
app.use('/api', sectorRoutes);
app.use('/api', seatTypeRoutes);
app.use('/api', ticketTypeRoutes);
app.use('/api', ticketStatusRoutes);
app.use('/api', paymentMethodRoutes);
app.use('/api', deliveryMethodRoutes);
app.use('/api', discountRoutes);
app.use('/api', langRoutes);
app.use('/api', typesRoutes);
app.use('/api', regionRoutes);
app.use('/api', districtRoutes);
app.use('/api', humanCategoryRoutes);
app.use('/api', eventTypeRoutes);
app.use('/api', venueRoutes);
app.use('/api', venueTypesRoutes);
app.use('/api', venuePhotoRoutes);
app.use('/api', seatRoutes);
app.use('/api', eventRoutes);
app.use('/api', customerRoutes);
app.use('/api', customerCardRoutes);
app.use('/api', customerAddressRoutes);
app.use('/api', ticketRoutes);
app.use('/api', cartRoutes);
app.use('/api', cartItemRoutes);
app.use('/api', bookingRoutes);

// Setup Swagger API Documentation
setupSwagger(app);

const PORT = process.env.PORT || 3333;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
}).catch(err => {
    console.error("Database connection failed:", err);
});

module.exports = app;
