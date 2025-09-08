import {
  Badge,
  Button,
  Card,
  DatePicker,
  Empty,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Tag,
} from "antd";
import { Delete, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { usePlanner } from "./store/usePlanner";
import moment from "moment";

const App = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState(new Date().toLocaleTimeString());
  const { tasks, addTask, deleteTask, updateStatus, deleteAllTask } = usePlanner();

  const highestTask = tasks.filter((item) => item.priority === "highest");
  const mediumTask = tasks.filter((item) => item.priority === "medium");
  const lowestTask = tasks.filter((item) => item.priority === "lowest");

  const createTask = (value) => {
    value.status = "pending";
    value.id = Date.now();
    value.createAt = new Date();
    addTask(value);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-rose-500 via-slate-800 to-slate-500 fixed top-0 left-0 w-full z-50 px-4 sm:px-6 md:px-8 py-2 sm:py-3 flex flex-wrap items-center justify-between gap-2">
  {/* Logo */}
  <div className="flex items-center gap-2 flex-shrink-0  ">
    <button className="h-10 w-10 sm:h-12 sm:w-12 bg-blue-600 rounded-full font-bold text-white text-sm sm:text-base">
      PL
    </button>
    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">anner</h1>
  </div>

  {/* Controls */}
  <div className="flex flex-wrap items-center gap-2 sm:gap-4 justify-end flex-1">
    {/* Date Picker */}
    <DatePicker className="w-full sm:w-auto" placeholder="Select Date" />

    {/* Timer */}
    <span className="text-white font-semibold text-sm sm:text-base md:text-lg whitespace-nowrap">
      {timer}
    </span>

    {/* Add Task */}
    <button
      onClick={() => setOpen(true)}
      className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-500 text-white flex items-center gap-1 text-xs sm:text-sm md:text-base font-medium hover:scale-105 transition-transform duration-300 py-1 sm:py-2 px-2 sm:px-3 rounded shadow-md hover:shadow-lg"
    >
      <Plus className="w-4 h-4 sm:w-5 sm:h-5" /> Add Task
    </button>

    {/* Delete All */}
    <Popconfirm
      title="Do you want to delete all tasks?"
      onConfirm={() => deleteAllTask()}
    >
      <button className="bg-gradient-to-br from-rose-500 via-rose-600 to-rose-500 text-white flex items-center gap-1 text-xs sm:text-sm md:text-base font-medium hover:scale-105 transition-transform duration-300 py-1 sm:py-2 px-2 sm:px-3 rounded shadow-md hover:shadow-lg">
        <Delete className="w-4 h-4 sm:w-5 sm:h-5" /> Delete All
      </button>
    </Popconfirm>
  </div>
</nav>


      {/* Task Columns */}
      <section className="pt-[80px] px-4 md:px-8 pb-[80px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Highest Priority */}
        <div className="min-h-[300px] h-auto">
          <Badge.Ribbon text="Highest" className="bg-gradient-to-r !from-rose-600 !via-pink-600 !to-rose-600 font-medium" />
          <div className="bg-white rounded-lg h-auto min-h-[300px] overflow-auto p-4 sm:p-6 space-y-4">
            {highestTask.length === 0 ? (
              <div className="flex flex-col items-center gap-3">
                <Empty description="No highest priority tasks" />
                <button
                  onClick={() => setOpen(true)}
                  className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-500 text-white w-full sm:w-auto flex justify-center gap-1 font-medium hover:scale-105 transition-transform duration-300 py-2 px-3 rounded"
                >
                  <Plus className="w-4 h-4" /> Add Task
                </button>
              </div>
            ) : (
              highestTask.map((item) => (
                <Card
                  key={item.id}
                  hoverable
                  className="rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 bg-white p-3 sm:p-4"
                >
                  <Card.Meta
                    title={<span className="capitalize text-base font-semibold text-slate-800">{item.title}</span>}
                    description={<span className="capitalize text-sm text-slate-500">{item.description}</span>}
                  />
                  <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                    <div className="flex gap-2 items-center">
                      <Tag
                        className={`!rounded-full !px-3 !py-1 !text-xs !font-medium ${
                          item.status === "pending"
                            ? "!bg-blue-100 !border-blue-200 !text-blue-700"
                            : item.status === "inProgress"
                            ? "!bg-yellow-100 !border-yellow-200 !text-yellow-700"
                            : "!bg-green-100 !border-green-200 !text-green-700"
                        }`}
                      >
                        {item.status}
                      </Tag>
                      <Tag
                        onClick={() => deleteTask(item.id)}
                        className="!rounded-full !px-3 !py-1 !text-xs !font-medium !bg-rose-500 !border-rose-500 !text-white cursor-pointer hover:!bg-rose-600 transition-colors"
                      >
                        Delete
                      </Tag>
                    </div>
                    <Select
                      size="small"
                      placeholder="Change Status"
                      className="min-w-[120px]"
                      onChange={(value) => updateStatus(item.id, value)}
                    >
                      <Select.Option value="pending">Pending</Select.Option>
                      <Select.Option value="inProgress">In Progress</Select.Option>
                      <Select.Option value="completed">Completed</Select.Option>
                    </Select>
                  </div>
                  <p className="text-xs text-slate-500 mt-3 flex items-center">
                    📅 {moment(item.createAt).format("DD MMM YYYY, hh:mm A")}
                  </p>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Medium Priority */}
        <div className="min-h-[300px] h-auto">
          <Badge.Ribbon text="Medium" className="bg-gradient-to-r !from-indigo-600 !via-blue-600 !to-indigo-600 font-medium" />
          <div className="bg-white rounded-lg h-auto min-h-[300px] overflow-auto p-4 sm:p-6 space-y-4">
            {mediumTask.length === 0 ? (
              <div className="flex flex-col items-center gap-3">
                <Empty description="No medium priority tasks" />
                <button
                  onClick={() => setOpen(true)}
                  className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-500 text-white w-full sm:w-auto flex justify-center gap-1 font-medium hover:scale-105 transition-transform duration-300 py-2 px-3 rounded"
                >
                  <Plus className="w-4 h-4" /> Add Task
                </button>
              </div>
            ) : (
              mediumTask.map((item) => (
                <Card
                  key={item.id}
                  hoverable
                  className="rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 bg-white p-3 sm:p-4"
                >
                  <Card.Meta
                    title={<span className="capitalize text-base font-semibold text-slate-800">{item.title}</span>}
                    description={<span className="capitalize text-sm text-slate-500">{item.description}</span>}
                  />
                  <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                    <div className="flex gap-2 items-center">
                      <Tag
                        className={`!rounded-full !px-3 !py-1 !text-xs !font-medium ${
                          item.status === "pending"
                            ? "!bg-blue-100 !border-blue-200 !text-blue-700"
                            : item.status === "inProgress"
                            ? "!bg-yellow-100 !border-yellow-200 !text-yellow-700"
                            : "!bg-green-100 !border-green-200 !text-green-700"
                        }`}
                      >
                        {item.status}
                      </Tag>
                      <Tag
                        onClick={() => deleteTask(item.id)}
                        className="!rounded-full !px-3 !py-1 !text-xs !font-medium !bg-rose-500 !border-rose-500 !text-white cursor-pointer hover:!bg-rose-600 transition-colors"
                      >
                        Delete
                      </Tag>
                    </div>
                    <Select
                      size="small"
                      placeholder="Change Status"
                      className="min-w-[120px]"
                      onChange={(value) => updateStatus(item.id, value)}
                    >
                      <Select.Option value="pending">Pending</Select.Option>
                      <Select.Option value="inProgress">In Progress</Select.Option>
                      <Select.Option value="completed">Completed</Select.Option>
                    </Select>
                  </div>
                  <p className="text-xs text-slate-500 mt-3 flex items-center">
                    📅 {moment(item.createAt).format("DD MMM YYYY, hh:mm A")}
                  </p>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Lowest Priority */}
        <div className="min-h-[300px] h-auto">
          <Badge.Ribbon text="Lowest" className="bg-gradient-to-r !from-amber-500 !via-orange-500 !to-amber-500 font-medium" />
          <div className="bg-white rounded-lg h-auto min-h-[300px] overflow-auto p-4 sm:p-6 space-y-4">
            {lowestTask.length === 0 ? (
              <div className="flex flex-col items-center gap-3">
                <Empty description="No lowest priority tasks" />
                <button
                  onClick={() => setOpen(true)}
                  className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-500 text-white w-full sm:w-auto flex justify-center gap-1 font-medium hover:scale-105 transition-transform duration-300 py-2 px-3 rounded"
                >
                  <Plus className="w-4 h-4" /> Add Task
                </button>
              </div>
            ) : (
              lowestTask.map((item) => (
                <Card
                  key={item.id}
                  hoverable
                  className="rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 bg-white p-3 sm:p-4"
                >
                  <Card.Meta
                    title={<span className="capitalize text-base font-semibold text-slate-800">{item.title}</span>}
                    description={<span className="capitalize text-sm text-slate-500">{item.description}</span>}
                  />
                  <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                    <div className="flex gap-2 items-center">
                      <Tag
                        className={`!rounded-full !px-3 !py-1 !text-xs !font-medium ${
                          item.status === "pending"
                            ? "!bg-blue-100 !border-blue-200 !text-blue-700"
                            : item.status === "inProgress"
                            ? "!bg-yellow-100 !border-yellow-200 !text-yellow-700"
                            : "!bg-green-100 !border-green-200 !text-green-700"
                        }`}
                      >
                        {item.status}
                      </Tag>
                      <Tag
                        onClick={() => deleteTask(item.id)}
                        className="!rounded-full !px-3 !py-1 !text-xs !font-medium !bg-rose-500 !border-rose-500 !text-white cursor-pointer hover:!bg-rose-600 transition-colors"
                      >
                        Delete
                      </Tag>
                    </div>
                    <Select
                      size="small"
                      placeholder="Change Status"
                      className="min-w-[120px]"
                      onChange={(value) => updateStatus(item.id, value)}
                    >
                      <Select.Option value="pending">Pending</Select.Option>
                      <Select.Option value="inProgress">In Progress</Select.Option>
                      <Select.Option value="completed">Completed</Select.Option>
                    </Select>
                  </div>
                  <p className="text-xs text-slate-500 mt-3 flex items-center">
                    📅 {moment(item.createAt).format("DD MMM YYYY, hh:mm A")}
                  </p>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white h-[60px] fixed bottom-0 left-0 w-full flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 gap-2 sm:gap-0">
        <h1 className="text-base sm:text-xl font-bold">Total Tasks: {tasks.length}</h1>
      </footer>

      {/* Modal */}
      <Modal open={open} onCancel={handleClose} maskClosable={false} footer={null}>
        <h1 className="text-lg font-medium m-2">New Task</h1>
        <Form onFinish={createTask} form={form}>
          <Form.Item name="title" rules={[{ required: true }]}>
            <Input placeholder="Task Title" />
          </Form.Item>
          <Form.Item name="description" rules={[{ required: true }]}>
            <Input.TextArea placeholder="Task Description" rows={5} />
          </Form.Item>
          <Form.Item name="priority" rules={[{ required: true }]}>
            <Select placeholder="Select Priority" size="large">
              <Select.Option value="lowest">Lowest</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="highest">Highest</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
