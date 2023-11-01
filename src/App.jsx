import { DndContext } from "@dnd-kit/core"
import Gallery from "./components/Gallery"

const App = () => {
  return (
    <div className="grid min-h-[100dvh] items-center">
      <section>
        <div className="container">
          <Gallery />
        </div>
      </section>
    </div>
  )
}

export default App
