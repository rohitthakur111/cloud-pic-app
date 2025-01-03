import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
	return (
		<div className="section-container">
			<div className="outlet-container container">
				<section className="flex items-center h-full dark:bg-gray-50 dark:text-gray-800 xl:mt-32">
					<div className="container flex flex-col items-center justify-center" >
						<div className="max-w-md text-center">
							<h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
								<span className="sr-only">Error</span>404
							</h2>
							<p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
							<p className="mt-4 mb-8 dark:text-gray-600">But dont worry, you can find plenty of other things on our homepage.</p>
							<Link
								rel="noopener noreferrer"
								href="#"
								className="px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50 bg-gray-600 text-white"
							>
								Back to homepage
							</Link>
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}

export default NotFound