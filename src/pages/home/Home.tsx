import Experience from "../../components/Experience"
import Header from "../../components/Header"


const Home = () => {
  return (
    <>
      <Header/>

      <section className="border-t border-neutral-800 w-screen mb-20"></section>
      <div>
        <div className="header-bg-elipse-1 absolute -left-64"></div>
      </div>

      <Experience/>

      <div className='p-15'>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi dignissimos expedita, perferendis officia repudiandae nam molestiae maxime cumque quas dicta earum doloremque deleniti assumenda aut ipsam a, debitis iste iusto!</span>
      </div>

      <div className='p-15'>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias assumenda facilis quasi, excepturi nulla obcaecati aliquid deserunt quaerat. Quasi vero commodi delectus laboriosam facere illo error nemo ullam pariatur fugiat?</span>
      </div>

      <div className='p-15'>
        <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum illo atque facere blanditiis! Distinctio explicabo, eum quam blanditiis assumenda dicta corporis magni necessitatibus ipsum eius eos ea reiciendis impedit sapiente.</span>
      </div>

      <div className='p-15'>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem voluptatibus veritatis cumque omnis ad unde, minus, deleniti voluptatum inventore quidem pariatur ratione maiores, eligendi excepturi hic ut placeat officiis odit!</span>
      </div>

    </>
  )
}

export default Home