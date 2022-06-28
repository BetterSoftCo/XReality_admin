import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/outline'
import _ from 'lodash'
import Link from 'next/link'

export default function Index({items, pageSize, currentPage, onPageChange}: any) {
	const pageCount = items / pageSize
	if(Math.ceil(pageCount) === 1 ) return null
	const pages = _.range(1, pageCount + 1)

	return (
		<>
			<nav className='mt-12'>
				<ol className="flex justify-center space-x-1 text-xs font-medium">
					{/* <li>
						<a href="/?page=1" className="inline-flex items-center justify-center w-8 h-8 border border-gray-200 rounded">
						<ArrowNarrowRightIcon className='w-5 h-5 text-gray-400' />
						</a>
					</li> */}
					<ul className='flex justify-center items-center gap-1'>
						{pages.map((page : number)=>(
							<li key={page} 
							className={page === currentPage ? 'bg-indigo-400 text-white rounded-md': "text-indigo-800 rounded-md"}>
								<a className="block w-8 h-8 leading-8 text-center rounded-md border border-gray-100 cursor-pointer" onClick={() =>onPageChange(page)}>
									{page}
								</a>
							</li>
						))}
					</ul>
					{/* <li>
						<a href="/?page=3" className="inline-flex items-center justify-center w-8 h-8 border border-gray-200 rounded">
						<ArrowNarrowLeftIcon className='w-5 h-5 text-gray-400' />
						</a>
					</li> */}
				</ol>
			</nav>
		</>
	)
}
