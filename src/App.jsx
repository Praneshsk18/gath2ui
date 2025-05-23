import "./App.css";
import { useState, useEffect } from "react";
import {
  Blend,
  Book,
  CirclePlus,
  CircleX,
  File,
  FolderUp,
  IdCard,
  LogOut,
  NotebookPen,
  Printer,
  Search,
  Settings,
  Tag,
  TicketPercent,
  UserRound,
  Menu,
} from "lucide-react";
import axios from "axios";

function App() {
  const [data, setdata] = useState([]);
  const [formdata, setformdata] = useState({
    id: "1",
    article_no: "",
    product_service: "",
    in_price: "",
    price: "",
    unit: "",
    in_stock: "",
    description: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleformdatachange = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formdata);

    try {
      const response = await axios.post(
        "https://gath2.onrender.com/add",
        formdata
      );
      console.log("Response:", response.data);
      closeForm();
      const updatedData = await axios.get("https://gath2.onrender.com");
      setdata(updatedData.data);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("https://gath2.onrender.com");
        setdata(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchdata();
  }, []);

  const handleDelete = async (article_no) => {
    try {
      console.log("Dot");
      await axios.delete(`https://gath2.onrender.com/remove/${article_no}`);
      const updatedData = await axios.get("https://gath2.onrender.com");
      setdata(updatedData.data);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const truncateText = (text, maxLength = 50) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  return (
    <div className="flex flex-col min-h-screen w-full bg-white overflow-hidden">
      <div className="flex flex-row justify-between items-center h-20 w-full bg-blue-600 p-2 md:p-4">
        <button className="text-white md:hidden" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <div className="flex flex-row items-center gap-2 md:gap-4 w-full mx-15 justify-between text-white text-sm md:text-base">
          <div className="flex flex-row items-center gap-2">
            <img
              src="https://tse4.mm.bing.net/th?id=OIP.hGSCbXlcOjL_9mmzerqAbQHaHa&pid=Api&P=0&h=180"
              className="h-5 md:h-10 rounded-full"
              alt="Language"
            />
            <div className="flex flex-col">
              <p className="text-sm md:text-base">John Andre</p>
              <p className="text-xs md:text-sm">Starfroid AS</p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p>English</p>
            <img
              src="https://storage.123fakturere.no/public/flags/GB.png"
              className="h-5 md:h-6 rounded-md"
              alt="Language"
            />
          </div>
        </div>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 md:p-6 rounded-lg w-11/12 max-w-md relative">
            <button
              onClick={closeForm}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
            <h2 className="text-lg md:text-xl mb-4">Add New Product</h2>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <input
                name="article_no"
                type="text"
                placeholder="Article No"
                className="border w-full p-2 rounded text-sm md:text-base"
                value={formdata.article_no}
                onChange={handleformdatachange}
              />
              <input
                name="product_service"
                type="text"
                placeholder="Product/Service"
                className="border w-full p-2 rounded text-sm md:text-base"
                value={formdata.product_service}
                onChange={handleformdatachange}
              />
              <input
                name="in_price"
                type="number"
                placeholder="In Price"
                className="border w-full p-2 rounded text-sm md:text-base"
                value={formdata.in_price}
                onChange={handleformdatachange}
              />
              <input
                name="price"
                type="number"
                placeholder="Price"
                className="border w-full p-2 rounded text-sm md:text-base"
                value={formdata.price}
                onChange={handleformdatachange}
              />
              <input
                name="unit"
                type="text"
                placeholder="Unit"
                className="border w-full p-2 rounded text-sm md:text-base"
                value={formdata.unit}
                onChange={handleformdatachange}
              />
              <input
                name="in_stock"
                type="number"
                placeholder="In Stock"
                className="border w-full p-2 rounded text-sm md:text-base"
                value={formdata.in_stock}
                onChange={handleformdatachange}
              />
              <textarea
                name="description"
                placeholder="Description"
                className="border w-full p-2 rounded text-sm md:text-base"
                value={formdata.description}
                onChange={handleformdatachange}
              ></textarea>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded w-full text-sm md:text-base"
              >
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="flex flex-row flex-1">
        <div
          className={`${
            showSidebar ? "flex" : "hidden"
          } md:flex flex-col w-full md:w-[20%] bg-gradient-to-r from-white to-gray-200 p-2 md:p-4 absolute md:static z-40 h-full md:h-auto transition-all duration-300`}
        >
          {[
            [<File className="text-sky-700" />, "Invoices"],
            [<UserRound className="text-green-700" />, "Customers"],
            [<Settings className="text-gray-700" />, "My Business"],
            [<Book className="text-blue-700" />, "Invoice Journal"],
            [<Tag className="text-orange-700" />, "Price List"],
            [<CircleX className="text-red-700" />, "Multiple Invoicing"],
            [<TicketPercent className="text-yellow-700" />, "Unpaid Invoices"],
            [<NotebookPen className="text-teal-700" />, "Offer"],
            [<IdCard className="text-indigo-700" />, "Inventory Control"],
            [<FolderUp className="text-purple-700" />, "Member Invoicing"],
            [<LogOut className="text-emerald-700" />, "Import/Export"],
            [<LogOut className="text-emerald-700" />, "Log out"],
          ].map(([Icon, label], index) => (
            <div
              key={index}
              className="flex flex-row items-center p-2 md:p-3 hover:bg-sky-500/40 hover:cursor-pointer"
            >
              {Icon}
              <p className="ml-2 text-gray-700 text-sm md:text-base">{label}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col w-full md:w-[80%] p-2 md:p-4">
          <div className="flex flex-col md:flex-row w-full items-start md:items-center justify-between mb-4 gap-2">
            <div className="flex flex-col w-full md:w-auto space-y-2">
              <div className="relative w-full md:w-[200px]">
                <input
                  className="w-full border border-gray-300 rounded-full h-8 pl-4 pr-10 focus:outline-none text-sm"
                  placeholder="Search Article No..."
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
              </div>
              <div className="relative w-full md:w-[200px]">
                <input
                  className="w-full border border-gray-300 rounded-full h-8 pl-4 pr-10 focus:outline-none text-sm"
                  placeholder="Search Product..."
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <button
                className="flex  items-center gap-x-1 justify-center w-auto px-4 h-10 bg-green-100 rounded-full text-green-500 hover:bg-green-200 hover:cursor-pointer"
                onClick={openForm}
              >New Product
                <CirclePlus size={20} />
              </button>
              <button className="flex items-center justify-center w-auto px-4 h-10 gap-x-1 bg-blue-100 rounded-full text-blue-500 hover:bg-blue-200 hover:cursor-pointer">Print list
                <Printer size={20} />
              </button>
              <button className="flex items-center justify-center gap-x-1 w-auto h-10 px-4 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 hover:cursor-pointer">Advanced Mode
                <Blend size={20} />
              </button>
            </div>
          </div>
          <div className="w-full h-[calc(100vh-200px)] overflow-x-auto overflow-y-auto">
            <div className="md:hidden flex flex-col space-y-2 min-w-[300px]">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center p-2 bg-gray-50 rounded-lg min-w-[300px]"
                >
                  <div className="flex-1 flex flex-col pr-2">
                    <p className="text-sm font-medium">
                      {truncateText(item.product_service)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Art. No: {item.article_no}
                    </p>
                    <p className="text-xs text-gray-500">Price: {item.price}</p>
                    <p className="text-xs text-gray-500">
                      In Stock: {item.in_stock}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(item.article_no)}
                    className="text-red-500 hover:text-red-700 flex items-center justify-center w-8 h-8"
                    title="Delete"
                  >
                    <CircleX size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div className="hidden md:block min-w-[800px]">
              <div className="flex flex-row font-bold bg-gray-200 p-2 text-sm">
                <div className="w-[10%]">Article No.</div>
                <div className="w-[25%]">Product/Service</div>
                <div className="w-[10%]">In Price</div>
                <div className="w-[10%]">Price</div>
                <div className="w-[10%]">In Stock</div>
                <div className="w-[10%]">Unit</div>
                <div className="w-[25%]">Description</div>
              </div>
              {data.map((item, index) => (
                <div key={index} className="flex flex-row p-2 border-b text-sm">
                  <div className="w-[10%]">{item.article_no}</div>
                  <div className="w-[25%]">
                    {truncateText(item.product_service)}
                  </div>
                  <div className="w-[10%]">{item.in_price}</div>
                  <div className="w-[10%]">{item.price}</div>
                  <div className="w-[10%]">{item.in_stock}</div>
                  <div className="w-[10%]">{item.unit}</div>
                  <div className="w-[25%]">
                    {truncateText(item.description, 60)}
                  </div>
                  <button
                    onClick={() => handleDelete(item.article_no)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <CircleX size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
