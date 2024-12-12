import Navbar from '../Navbar';
import Footer from '../Footer';

function AlertPage() {
  return (
    <>
      <Navbar></Navbar>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-green-200 text-green-800 p-4 rounded-md shadow-md">
          <p className="text-lg font-semibold">No new alerts</p>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default AlertPage;
