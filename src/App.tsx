import {Navbar,Welcome} from '#components';

const App = () => {
    return (
       <main>
           <div className="wallpaper-container">
               <div className="wallpaper wallpaper-light" />
               <div className="wallpaper wallpaper-dark" />
           </div>
           <Navbar />
           <Welcome />
       </main>
    )
}
export default App
