\# 🍳 FridgeChef - AI-Powered Recipe Generator



Transform your fridge photos into delicious recipes! FridgeChef uses intelligent image analysis to detect ingredients and generate personalized recipe suggestions.



!\[FridgeChef Demo](https://via.placeholder.com/800x400?text=Add+Your+Screenshot+Here)



\## 🌟 Features



\- 📸 \*\*Smart Image Upload\*\* - Snap a photo of your fridge

\- 🤖 \*\*AI Ingredient Detection\*\* - Custom computer vision algorithm analyzes colors and patterns

\- 👨‍🍳 \*\*Recipe Generation\*\* - Get 5 personalized recipes based on available ingredients

\- 🔐 \*\*Secure Authentication\*\* - JWT-based user authentication

\- 📱 \*\*Responsive Design\*\* - Works seamlessly on mobile and desktop

\- ✨ \*\*Beautiful UI/UX\*\* - Smooth animations and modern design



\## 🎯 Problem It Solves



\- Reduces food waste by using ingredients before they expire

\- Saves time searching for recipes

\- Helps cook with what you already have

\- Promotes sustainable cooking habits



\## 🛠️ Tech Stack



\### Frontend

\- \*\*React 18\*\* - UI library

\- \*\*Vite\*\* - Build tool

\- \*\*Tailwind CSS\*\* - Styling

\- \*\*Framer Motion\*\* - Animations

\- \*\*Axios\*\* - HTTP client

\- \*\*Lucide React\*\* - Icons



\### Backend

\- \*\*Node.js\*\* - Runtime

\- \*\*Express.js\*\* - Web framework

\- \*\*MongoDB\*\* - Database

\- \*\*Mongoose\*\* - ODM

\- \*\*JWT\*\* - Authentication

\- \*\*bcryptjs\*\* - Password hashing

\- \*\*Sharp\*\* - Image processing

\- \*\*Multer\*\* - File upload

\- \*\*Cloudinary\*\* - Image storage



\### AI/Computer Vision

\- \*\*Custom Color Detection Algorithm\*\* - RGB-based ingredient detection

\- \*\*Sharp Library\*\* - Pixel analysis and image processing



\## 🚀 Getting Started



\### Prerequisites

\- Node.js 16+ installed

\- MongoDB Atlas account

\- Cloudinary account



\### Installation



1\. \*\*Clone the repository\*\*

```bash

git clone https://github.com/YOUR\_USERNAME/fridgechef.git

cd fridgechef

```



2\. \*\*Setup Backend\*\*

```bash

cd fridge-recipe-backend

npm install

```



Create `.env` file in backend folder:

```env

PORT=5000

MONGODB\_URI=your\_mongodb\_connection\_string

JWT\_SECRET=your\_jwt\_secret

CLOUDINARY\_CLOUD\_NAME=your\_cloud\_name

CLOUDINARY\_API\_KEY=your\_api\_key

CLOUDINARY\_API\_SECRET=your\_api\_secret

FRONTEND\_URL=http://localhost:5173

```



Start backend:

```bash

npm run dev

```



3\. \*\*Setup Frontend\*\*

```bash

cd ../fridge-recipe-frontend

npm install

```



Create `.env` file in frontend folder:

```env

VITE\_API\_URL=http://localhost:5000

```



Start frontend:

```bash

npm run dev

```



4\. \*\*Open your browser\*\*

Navigate to `http://localhost:5173`



\## 📸 How It Works



1\. \*\*Upload\*\* - Take a photo of your fridge or pantry

2\. \*\*Analyze\*\* - AI processes the image and detects ingredients using color pattern recognition

3\. \*\*Generate\*\* - Get 5 personalized recipes with step-by-step instructions

4\. \*\*Cook\*\* - Follow the recipe and enjoy your meal!



\## 🎨 Features Breakdown



\### Ingredient Detection Algorithm

```javascript

// Custom color-based detection

\- Red tones → Tomatoes, Peppers

\- Green tones → Cucumbers, Lettuce, Broccoli

\- Orange tones → Carrots, Oranges, Cheese

\- Purple tones → Eggplants, Cabbage

\- Brown tones → Potatoes, Onions, Mushrooms

```



\### Recipe Generation

\- Dynamic recipe creation based on detected ingredients

\- 5 different recipe types (Stir-fry, Salad, Roasted, Soup, Main dish)

\- Ingredient availability tracking

\- Cooking time and difficulty indicators

\- Calorie information



\## 📊 Project Structure

```

fridgechef/

├── fridge-recipe-backend/

│   ├── src/

│   │   ├── controllers/

│   │   ├── models/

│   │   ├── routes/

│   │   ├── services/

│   │   │   ├── geminiService.js (Image analysis)

│   │   │   ├── recipeService.js (Recipe generation)

│   │   │   └── authService.js

│   │   └── server.js

│   ├── .env

│   └── package.json

│

└── fridge-recipe-frontend/

&nbsp;   ├── src/

&nbsp;   │   ├── components/

&nbsp;   │   ├── services/

&nbsp;   │   ├── App.jsx

&nbsp;   │   └── main.jsx

&nbsp;   ├── .env

&nbsp;   └── package.json

```



\## 🔐 Security Features



\- Password hashing with bcryptjs

\- JWT token authentication

\- Protected API routes

\- Environment variable configuration

\- CORS configuration



\## 🌐 Deployment



\### Backend (Render/Railway)

1\. Push code to GitHub

2\. Connect repository to Render/Railway

3\. Add environment variables

4\. Deploy!



\### Frontend (Vercel/Netlify)

1\. Push code to GitHub

2\. Connect repository to Vercel/Netlify

3\. Add environment variables

4\. Deploy!



\## 📈 Future Enhancements



\- \[ ] User recipe history

\- \[ ] Favorite recipes

\- \[ ] Shopping list generation

\- \[ ] Nutritional information

\- \[ ] Recipe sharing

\- \[ ] ML model for improved accuracy

\- \[ ] Voice commands

\- \[ ] Meal planning



\## 👨‍💻 Author



\*\*Nisha Anand\*\*

\- GitHub: \[@yourusername](https://github.com/yourusername)

\- LinkedIn: \[Your LinkedIn](https://linkedin.com/in/yourprofile)





\## 📝 License



This project is open source and available under the \[MIT License](LICENSE).



\## 🙏 Acknowledgments



\- Color detection inspiration from computer vision research

\- Recipe data structures from culinary APIs

\- UI/UX inspiration from modern recipe apps



⭐ Star this repo if you found it helpful!

