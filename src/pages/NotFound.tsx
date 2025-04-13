import { Link } from "react-router-dom"
const NotFound = () => {
  return (
    <>
      <section className="flex items-center h-screen p-16 bg-green-200 dark:bg-green-200">
        <div className="container flex flex-col items-center ">
          <div className="flex flex-col gap-6 max-w-md text-center">
            <h2 className="font-extrabold text-9xl text-purple-400 dark:text-purple-400">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl md:text-3xl dark:text-gray-400">Sorry, we couldn't find this page.</p>
            <Link to={"/"} className="px-8 py-4 text-xl font-semibold rounded bg-purple-600 text-gray-50 hover:text-gray-200">Back to home</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default NotFound