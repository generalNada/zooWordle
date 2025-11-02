# ScheduleOne

A minimalist scheduling app that lets users:
- Add a day with an ID and date.
- View all days and their associated notes.
- Search notes dynamically by character or prefix.

## Features
1. **Add a Day**: Input an ID and a date, stored in IndexedDB.
2. **View All Days**: Display a list of IDs with dates. Each ID opens to manage notes.
3. **Manage Notes**:
   - Add, edit, delete, or toggle visibility.
   - Add links as notes that open in a new window.
4. **Search Notes**: Filter notes in real-time by typing characters or prefixes.

## File Structure


scheduleOne/
│
├── index.html       # Main HTML structure for the app
├── style.css        # Styles for the app’s UI
├── script.js        # Front-end logic for interactions and IndexedDB
└── README.md        # Documentation for the project


## How to Use
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/scheduleOne.git
   cd scheduleOne

   ---

### **Next Steps**
1. Copy this content into your `README.md` file.
2. After creating the project files, follow the Git workflow to commit and push:
   ```bash
   git add .
   git commit -m "Add project files and README"
   git push origin main