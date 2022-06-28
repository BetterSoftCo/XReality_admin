import { CameraIcon, CubeIcon, VideoCameraIcon } from "@heroicons/react/outline";
import Image from "next/image";

export default function TargetItem({target}: any) {
	return (
		<>
			<div>
			 <div className="inline-block rounded-lg overflow-hidden">
                <a
                  href=""
                  className="block p-4 rounded-lg border border-gray-200"
                >
                  <Image
                    alt="123 Wallaby Avenue, Park Road"
                    src="/images/default.jpg"
					width={500}
					height={400}
                    className="object-cover w-full h-56 rounded-md"
                  />
                  <div className="mt-2">
                    <dl>
                      <div>
                        {/* عنوان */}
                        <dd className="font-medium text-2xl text-indigo-800">
                         {target.title}
                        </dd>
                      </div>
                    </dl>
                    <dl className="flex justify-center items-center gap-x-2 mt-6 text-xs">
                      <div className="flex justify-between items-center gap-x-2">
						<CameraIcon className="w-5 h-5 text-gray-300" />
                        <div className="sm:ml-3 mt-1.5 sm:mt-0">
                          <dt className="text-gray-500">تصویر</dt>
                          <dd className="font-medium">2</dd>
                        </div>
                      </div>
                      <div className="flex justify-between items-center gap-x-2">
					  <VideoCameraIcon className="w-5 h-5 text-gray-300" />
                        <div className="sm:ml-3 mt-1.5 sm:mt-0">
                          <dt className="text-gray-500">ویدئو</dt>
                          <dd className="font-medium">2</dd>
                        </div>
                      </div>
                      <div className="flex justify-between items-center gap-x-2">
					  <CubeIcon className="w-5 h-5 text-gray-300" />
                        <div className="sm:ml-3 mt-1.5 sm:mt-0">
                          <dt className="text-gray-500">سه بعدی</dt>
                          <dd className="font-medium">4</dd>
                        </div>
                      </div>
                    </dl>
                  </div>
                </a>
              </div>
			</div>
		</>
	)
}
