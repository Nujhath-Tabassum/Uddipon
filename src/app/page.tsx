import Banner from "@/components/banner";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Banner />
      </main>
      <Footer />
    </>
  );
}
