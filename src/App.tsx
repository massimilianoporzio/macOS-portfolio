import Navbar from '#components/Navbar';

const App = () => {
    return (
       <main>
           <div className="wallpaper-container">
               <div className="wallpaper wallpaper-light" />
               <div className="wallpaper wallpaper-dark" />
           </div>
           <Navbar />
       </main>
    )
}
export default App
