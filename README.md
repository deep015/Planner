# Task Planner App 📝

![Task Planner Banner](https://via.placeholder.com/1200x300?text=Task+Planner+App)  

**Task Planner App** is a modern, responsive web application designed to help users manage tasks efficiently. It allows creating, updating, prioritizing, and tracking tasks in a clean and professional interface.

---

## 🌟 Features

- **Add, Edit, and Delete Tasks** – Quickly manage tasks with a modal-based form.
- **Priority-Based Organization** – Tasks are categorized as Highest, Medium, or Lowest priority.
- **Status Management** – Track task progress: Pending, In Progress, Completed.
- **Responsive & Interactive UI** – Mobile-first design with hover effects, gradients, and shadows.
- **Live Timer & Date Picker** – Stay aware of time and schedule tasks efficiently.
- **Delete All Tasks** – Remove all tasks at once using a confirmation popup.

---

## 💻 Tech Stack

- **Frontend:** React.js  
- **Styling:** Tailwind CSS  
- **UI Components:** Ant Design (Modal, DatePicker, Form, Select, Tag, Button, Popconfirm)  
- **Icons:** Lucide-react  
- **State Management:** Zustand  
- **Date Formatting:** Moment.js  

---

## 📊 Data Flow

1. **User Interaction:** Users create, update, or delete tasks via the UI.  
2. **State Update:** Actions like `addTask`, `deleteTask`, and `updateStatus` update the global state in Zustand.  
3. **UI Rendering:** Task cards and columns automatically re-render to reflect the latest state.  
4. **Persistent Components:** Header, footer, and task columns display dynamic information such as total tasks, live timer, and task lists.

---

## ⚡ State Management

Zustand is used for lightweight global state management:

- `tasks` – Stores all task objects.  
- `addTask(task)` – Adds a new task.  
- `deleteTask(id)` – Deletes a specific task.  
- `updateStatus(id, status)` – Updates task status.  
- `deleteAllTask()` – Clears all tasks.

---

## 🔮 Future Enhancements

- **Drag & Drop Task Movement** – Rearrange tasks between columns.  
- **Task Reminders & Notifications** – Notify users about pending/high-priority tasks.  
- **Like/Favorite Tasks** – Highlight important tasks.  
- **Progress Indicators** – Visual completion indicators for each priority column.  
- **Backend Integration** – Save tasks permanently with Node.js and MongoDB.  
- **Advanced Filters** – Filter tasks by priority, status, or date.

---

## 🚀 Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/task-planner-app.git
cd task-planner-app
