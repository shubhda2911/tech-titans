const express = require('express');
const http = require('http');
const socketIo = require('socket.io')
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const connectToDB = require('./config/db');
connectToDB();

const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

const indexRouter = require('./routes/index.route');
const individualRouter = require('./routes/individual.route');
const volunteerRouter = require('./routes/volunteer.route');
const receiverRouter = require('./routes/receiver.route');

app.use('/', indexRouter);
app.use('/individual',individualRouter);
app.use('/volunteer',volunteerRouter);
app.use('/receiver',receiverRouter);


const Donor = require('./models/individual');
const Receiver = require('./models/receiver');
const Volunteer = require('./models/volunteer');


// CHATBOT SECTION STARTS FROM HERE

function Chatbot() {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);
      
        let role = null;
        let step = 0;
        const formData = {};
      
        const roleQuestions = {
          donor: [
            { key: 'name', question: "What's your name?" },
            { key: 'contact', question: "What's your contact number?" },
            { key: 'email', question: "What's your email? (optional)" },
            { key: 'foodType', question: "Is the food Veg or Non-Veg?" },
            { key: 'pickupAddress', question: "What's the pickup food address?" },
            { key: 'quantity', question: "What's the quantity of food you're donating?" },
            { key: 'description', question: "Please describe the food." },
            { key: 'expiry', question: "What's the expiry time (or is it still eatable)?" }
          ],
          receiver: [
            { key: 'name', question: "What's your name?" },
            { key: 'contact', question: "What's your contact number?" },
            { key: 'email', question: "What's your email? (optional)" },
            { key: 'needType', question: "Do you need Veg or Non-Veg food?" },
            { key: 'foodForm', question: "What type of food do you need? (cooked/uncooked/packaged)" },
            { key: 'pickupAddress', question: "Where should the food be picked up from?" },
            { key: 'quantity', question: "How much food do you need?" }
          ],
          volunteer: [
            { key: 'name', question: "What's your name?" },
            { key: 'contact', question: "What's your contact number?" },
            { key: 'email', question: "What's your email? (optional)" },
            { key: 'location', question: "Which city and area are you from?" },
            { key: 'hasVehicle', question: "Do you have a vehicle for food pickup? (yes/no)" },
            { key: 'position', question: "Which volunteer position are you interested in?" },
            { key: 'feedback', question: "Any feedback for me?" }
          ]
        };
      
        socket.emit('bot-message', "Hi! I'm FormBot 🤖. Are you a donor, receiver, or volunteer?");
      
        socket.on('user-message', async (msg) => {
          if (!role) {
            const lowerInput = msg.toLowerCase();
            if (['donor', 'receiver', 'volunteer'].includes(lowerInput)) {
              role = lowerInput;
              socket.emit('bot-message', roleQuestions[role][step].question);
            } else {
              socket.emit('bot-message', "Please type either donor, receiver, or volunteer.");
            }
          } else {
            const question = roleQuestions[role][step];
            formData[question.key] = msg;
            step++;
      
            if (step < roleQuestions[role].length) {
              socket.emit('bot-message', roleQuestions[role][step].question);
            } else {
              socket.emit('bot-message', "✅ Thank you! Your form has been submitted.");
              console.log(`Form from ${role}:`, formData);
      
              // 📥 Save to MongoDB
              try {
                if (role === 'donor') {
                  await Donor.create(formData);
                } else if (role === 'receiver') {
                  await Receiver.create(formData);
                } else if (role === 'volunteer') {
                  await Volunteer.create(formData);
                }          
                console.log('📁 Data saved to MongoDB');
              } catch (error) {
                console.error('❌ Error saving to DB:', error);
              }
            }
          }
        });
      
        socket.on('disconnect', () => {
          console.log('User disconnected:', socket.id);
        });
      });
      
}

Chatbot();

app.listen(3000);