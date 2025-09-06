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
  const { tasks, addTask, deleteTask,updateStatus,deleteAllTask } = usePlanner();
  const highestTask = tasks.filter((item) => item.priority === "highest");
  const MediumTask = tasks.filter((item) => item.priority === "medium");
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
    const Interval = setInterval(() => {
      setTimer(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(Interval);
    };
  }, []);
  return (
    <div className="bg-gray-200 h-screen overflow-hidden">
      <nav className="text-white h-[60px] bg-gradient-to-r from-rose-500 via-slate-800 to-slate-500 fixed top-0 left-0 w-full px-8 flex justify-between items-center">
        <div className="flex items-center">
          <button className="h-10 w-10 bg-blue-600 rounded-full font-bold text-white">
            PL
          </button>
          <h1 className="text-2xl font-bold ml-1">anner</h1>
        </div>
        <div className="flex gap-4 items-center">
          <DatePicker placeholder="Select Date" />
          <h1 className="text-2xl font-bold lg:block hidden">{timer}</h1>
          <button
            onClick={() => setOpen(true)}
            className="bg-gradient-to-br from-blue-500 via-blue-600
                 to-blue-500 text-white flex text-sm  gap-1 font-medium hover:scale-105 
                 transition-transform duration-300 py-2 px-3 rounded focus:shadow-lg "
          >
            <Plus className="w-4 h-4 " />
            Add Task
          </button>
          <Popconfirm title="Do you want to delete all task ?" onConfirm={()=>deleteAllTask()}>
 <button  className="bg-gradient-to-br from-rose-500 via-rose-600
                 to-rose-500 text-white flex text-sm  gap-1 font-medium hover:scale-105 
                 transition-transform duration-300 py-2 px-3 rounded focus:shadow-lg ">
            <Delete className="w-4 h-4" />
            Delet All Task
          </button>
          </Popconfirm>
         
        </div>
      </nav>
      <section
        className=" fixed top-[60px] left-0 h-[calc(100%-120px)] 
        w-full overflow-x-auto overflow-y-visible grid lg:grid-cols-3 gap-8 p-8"
      >
        <div className="lg:h-full lg:min-h-0 h-[300px]">
          <Badge.Ribbon
            text="Highest"
            className="bg-gradient-to-r !from-rose-600 p-4
            !via-pink-600 !to-rose-600 font-medium"
          />

          <div className="bg-white   rounded-lg min-h-0 h-full overflow-auto p-7.5 space-y-8">
            <div claasName="flex flex-col gap-8">
              {highestTask.length === 0 && (
                <>
                  <Empty description="There is no task added as highest priority" />
                  <button
                    onClick={() => setOpen(true)}
                    className="bg-gradient-to-br from-blue-500 via-blue-600
                 to-blue-500 text-white w-fit mx-auto mt-2 flex text-sm  gap-1 font-medium hover:scale-105 
                 transition-transform duration-300 py-2 px-3 rounded focus:shadow-lg "
                  >
                    <Plus className="w-4 h-4 " />
                    Add Task
                  </button>
                </>
              )}
              {highestTask.map((item, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <Card
                    hoverable
                    className="rounded-xl border border-gray-100 shadow-sm hover:shadow-xl 
               transition-all duration-300 bg-white p-3"
                  >
                    {/* Title & Description */}
                    <Card.Meta
                      title={
                        <span className="capitalize text-base font-semibold text-slate-800">
                          {item.title}
                        </span>
                      }
                      description={
                        <span className="capitalize text-sm text-slate-500">
                          {item.description}
                        </span>
                      }
                    />

                    {/* Status & Actions */}
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex gap-2">
                        <div>
                        {
                          item.status === "pending" && (
                             <Tag
                          className="!rounded-full !px-3 !py-1 !text-xs !font-medium 
                     !bg-blue-100 !border-blue-200 !text-blue-700"
                        >
                          {item.status}
                        </Tag>
                          )
                        }
                        {
                          item.status === "inProgress" && (
                               <Tag
                          className="!rounded-full !px-3 !py-1 !text-xs !font-medium 
                     !bg-yellow-100 !border-yellow-200 !text-white-700"
                        >
                          {item.status}
                        </Tag>
                          )
                        }
                        {
                          item.status === "completed" && (
                               <Tag
                          className="!rounded-full !px-3 !py-1 !text-xs !font-medium 
                     !bg-red-100 !border-red-200 !text-white-700"
                        >
                          {item.status}
                        </Tag>
                          )
                        }
                       </div>
                        <Tag
                          onClick={() => deleteTask(item.id)}
                          className="!rounded-full !px-3 !py-1 !text-xs !font-medium 
                     !bg-rose-500 !border-rose-500 !text-white 
                     cursor-pointer hover:!bg-rose-600 transition-colors"
                        >
                          Delete
                        </Tag>
                      </div>

                      <Select
                        size="small"
                        placeholder="Change Status"
                        className="min-w-[120px]"
                        onChange={(value) => updateStatus(item.id,value)}
                      >
                        <Select.Option value="pending">Pending</Select.Option>
                        <Select.Option value="inProgress">
                          In Progress
                        </Select.Option>
                        <Select.Option value="completed">
                          Completed
                        </Select.Option>
                      </Select>
                    </div>

                    {/* Date */}
                    <p className="text-xs text-slate-500 mt-3 flex items-center">
                      📅 {moment(item.createAt).format("DD MMM YYYY, hh:mm A")}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:h-full lg:min-h-0 h-[300px]">
          <Badge.Ribbon
            text="Medium"
            className="bg-gradient-to-r !from-indigo-600
            !via-blue-600 !to-indigo-600 font-medium"
          />

          <div className="bg-white  rounded-lg min-h-0 h-full overflow-auto p-7.5 space-y-8">
            <div claasName="flex flex-col gap-5">
              {MediumTask.length === 0 && (
                <>
                  <Empty description="There is no task added as Medium priority" />
                  <button
                    onClick={() => setOpen(true)}
                    className="bg-gradient-to-br from-blue-500 via-blue-600
                 to-blue-500 text-white w-fit mx-auto mt-2 flex text-sm  gap-1 font-medium hover:scale-105 
                 transition-transform duration-300 py-2 px-3 rounded focus:shadow-lg "
                  >
                    <Plus className="w-4 h-4 " />
                    Add Task
                  </button>
                </>
              )}
              {MediumTask.map((item, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <Card
                    hoverable
                    className="rounded-xl border border-gray-100 shadow-sm 
               hover:shadow-xl transition-all duration-300 bg-white p-4"
                  >
                    {/* Title & Description */}
                    <Card.Meta
                      title={
                        <span className="capitalize text-base font-semibold text-slate-800">
                          {item.title}
                        </span>
                      }
                      description={
                        <span className="capitalize text-sm text-slate-500">
                          {item.description}
                        </span>
                      }
                    />

                    {/* Actions Row */}
                    <div className="mt-5 flex justify-between items-center">
                      {/* Status + Delete */}
                      <div className="flex gap-2">
                        <div>
                                    {
                          item.status === "pending" && (
                             <Tag
                          className="!rounded-full !px-3 !py-1 !text-xs !font-medium 
                     !bg-blue-100 !border-blue-200 !text-blue-700"
                        >
                          {item.status}
                        </Tag>
                          )
                        }
                        {
                          item.status === "inProgress" && (
                               <Tag
                          className="!rounded-full !px-3 !py-1 !text-xs !font-medium 
                     !bg-yellow-100 !border-yellow-200 !text-white-700"
                        >
                          {item.status}
                        </Tag>
                          )
                        }
                        {
                          item.status === "completed" && (
                               <Tag
                          className="!rounded-full !px-3 !py-1 !text-xs !font-medium 
                     !bg-red-100 !border-red-200 !text-white-700"
                        >
                          {item.status}
                        </Tag>
                          )
                        }
                    </div>
                        <Tag
                          onClick={() => deleteTask(item.id)}
                          className="!rounded-full !px-3 !py-1 !text-xs !font-medium 
                     !bg-rose-500 !border-rose-500 !text-white cursor-pointer 
                     hover:!bg-rose-600 transition-colors"
                        >
                          Delete
                        </Tag>
                      </div>

                      {/* Status Selector */}
                      <Select
                        size="small"
                        placeholder="Change Status"
                        className="min-w-[130px]"
                         onChange={(value) => updateStatus(item.id, value)} 
                      >
                        <Select.Option value="pending">Pending</Select.Option>
                        <Select.Option value="inProgress">
                          In Progress
                        </Select.Option>
                        <Select.Option value="completed">
                          Completed
                        </Select.Option>
                      </Select>
                    </div>

                    {/* Created Date */}
                    <p className="text-xs text-slate-500 mt-4 flex items-center">
                      📅 {moment(item.createAt).format("DD MMM YYYY, hh:mm A")}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:h-full lg:min-h-0 h-[300px]">
          <Badge.Ribbon
            text="Lowest"
            className="bg-gradient-to-r !from-amber-500
            !via-orange-500 !to-amber-500 font-medium"
          />

          <div className="bg-white  rounded-lg min-h-0 h-full overflow-auto p-7.5 space-y-8">
            <div claasName="flex flex-col gap-5">
              {lowestTask.length === 0 && (
                <>
                  <Empty description="There is no task added as lowest priority" />
                  <button
                    onClick={() => setOpen(true)}
                    className="bg-gradient-to-br from-blue-500 via-blue-600
                 to-blue-500 text-white w-fit mx-auto mt-2 flex text-sm  gap-1 font-medium hover:scale-105 
                 transition-transform duration-300 py-2 px-3 rounded focus:shadow-lg "
                  >
                    <Plus className="w-4 h-4 " />
                    Add Task
                  </button>
                </>
              )}
              {lowestTask.map((item, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <Card
                    hoverable
                    className="rounded-xl border border-gray-100 shadow-sm 
               hover:shadow-lg transition-all duration-300 bg-white p-4 mt-2"
                  >
                    {/* Title & Description */}
                    <Card.Meta
                      title={
                        <span className="capitalize text-base font-semibold text-slate-800">
                          {item.title}
                        </span>
                      }
                      description={
                        <span className="capitalize text-sm text-slate-500">
                          {item.description}
                        </span>
                      }
                    />

                    {/* Actions Row */}
                    <div className="mt-5 flex justify-between items-center">
                      {/* Status + Delete */}
                      <div className="flex gap-2">
                        <div>
                                   {
                          item.status === "pending" && (
                             <Tag
                          className="!rounded-full !px-3 !py-1 !text-xs !font-medium 
                     !bg-blue-100 !border-blue-200 !text-blue-700"
                        >
                          {item.status}
                        </Tag>
                          )
                        }
                        {
                          item.status === "inProgress" && (
                               <Tag
                          className="!rounded-full !px-3 !py-1 !text-xs !font-medium 
                     !bg-yellow-100 !border-yellow-200 !text-white-700"
                        >
                          {item.status}
                        </Tag>
                          )
                        }
                        {
                          item.status === "completed" && (
                               <Tag
                          className="!rounded-full !px-3 !py-1 !text-xs !font-medium 
                     !bg-red-100 !border-red-200 !text-white-700"
                        >
                          {item.status}
                        </Tag>
                          )
                        }
                    </div>
                        <Tag
                          onClick={() => deleteTask(item.id)}
                          className="!rounded-full !px-3 !py-1 !text-xs !font-medium 
                     !bg-rose-500 !border-rose-500 !text-white cursor-pointer 
                     hover:!bg-rose-600 transition-colors"
                        >
                          Delete
                        </Tag>
                      </div>

                      {/* Status Selector */}
                      <Select
                        size="small"
                        placeholder="Change Status"
                        className="min-w-[130px]"
                         onChange={(value) => updateStatus(item.id, value)} 
                      >
                        <Select.Option value="pending">Pending</Select.Option>
                        <Select.Option value="inProgress">
                          In Progress
                        </Select.Option>
                        <Select.Option value="completed">
                          Completed
                        </Select.Option>
                      </Select>
                    </div>

                    {/* Created Date */}
                    <p className="text-xs text-slate-500 mt-4 flex items-center">
                      📅 {moment(item.createAt).format("DD MMM YYYY, hh:mm A")}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-white h-[60px] fixed bottom-0 left-0 w-full flex items-center justify-between px-8">
        <h1 className="text-2xl font-bold">Total-Task:</h1>
      </footer>
      <Modal
        open={open}
        onCancel={handleClose}
        maskClosable={false}
        footer={null}
      >
        <h1 className="text-lg font-medium m-2">New Task</h1>
        <Form onFinish={createTask} form={form}>
          <Form.Item name="title" rules={[{ required: true }]}>
            <Input placeholder="Task Title" />
          </Form.Item>
          <Form.Item name="description" rules={[{ required: true }]}>
            <Input.TextArea placeholder="Task Description " rows={5} />
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
