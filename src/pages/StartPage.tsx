import { Link } from "react-router-dom"
import React, { useState } from "react"
import Footer from "../components/Footer"
import Button from "../components/Button"
import PopUp from "../components/PopUp/PopUp"
import DarkModeToggle from "../components/DarkModeToggle"
import { CircleHelp, Settings } from "lucide-react"

const StartPage: React.FC = () => {
  const [toggleSetting, setToggleSetting] = useState(false)
  const [toggleHelp, setToggleHelp] = useState(false)
  return (
    <>
      <div className="container m-2 flex flex-col items-center justify-center border-4 border-dashed py-20 relative">

        {/* Settings */}
        <PopUp visible={toggleSetting} onClose={() => { setToggleSetting(false) }} title="Settings">
          <div className="flex flex-col gap-2 p-2 w-full">
            <div className="flex flex-row dark:text-gray-600 text-gray-700 items-center space-x-10 justify-between text-shadow">
              <p>Dark Mode: </p>
              <DarkModeToggle />
            </div>
          </div>
        </PopUp>

        {/* Info */}
        <PopUp visible={toggleHelp} onClose={() => { setToggleHelp(false) }} title="Info">
          <div className="flex flex-col gap-4 p-8 w-full text-gray-700 dark:text-gray-300 overflow-y-auto h-[800px]">
            <p>
              Welcome to the <span className="font-semibold">Interactive Map Challenge</span>!
              In this game, you can <strong>explore</strong> or <strong>guess</strong> the different regions by clicking on the map.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi magni consequatur explicabo, atque itaque repellendus delectus quam hic rerum, inventore nulla earum ipsum corrupti? Possimus sunt aut deleniti nihil laborum nisi eum nemo nam suscipit pariatur delectus iure perferendis voluptate aliquid, provident iusto similique itaque nesciunt repudiandae at cumque sint, repellat eligendi velit? Natus cum veritatis eius voluptates pariatur sint dolor ex facere hic dolore? Expedita, sapiente explicabo praesentium vero nihil deleniti tenetur totam id exercitationem architecto dolores reiciendis cupiditate. Reiciendis at, nobis fugiat omnis, labore possimus eius, ad vero eum saepe cum esse numquam quia! Maiores, nemo consequatur. Ut officia dolore consequatur inventore facere animi tempora dignissimos, optio deleniti voluptas sint temporibus ad. Quia ab similique ducimus ipsa consectetur blanditiis ipsum eius a magnam voluptatibus suscipit nisi, odio amet? Alias nostrum voluptates nulla atque, reprehenderit doloribus, soluta assumenda obcaecati corrupti porro magni non officiis minus ipsam nesciunt. Eum reiciendis totam laboriosam quo quos porro, nulla fuga voluptas nobis libero exercitationem, temporibus soluta nostrum facere delectus ea tenetur suscipit non! Corrupti excepturi impedit, officia modi dolorem provident adipisci recusandae animi! Corrupti facilis sed aliquam amet mollitia provident. Perspiciatis minus vero suscipit a sequi perferendis rem possimus voluptatibus, provident neque earum qui dignissimos velit doloremque animi placeat repudiandae ipsum labore dolor ipsam similique ipsa alias? Animi cupiditate eius id quisquam, at nisi deleniti, perferendis blanditiis consequatur consectetur dicta, saepe quos nemo numquam iste placeat! Doloribus obcaecati, voluptatem expedita non blanditiis quaerat porro mollitia, numquam cupiditate corporis dolorum praesentium. Harum, sit perferendis aut animi nulla voluptas incidunt quidem vel ut. Est expedita, minus dolore corporis omnis non explicabo voluptatum, inventore quidem deserunt earum laborum natus blanditiis repellat eos voluptatibus doloremque nulla dolorem mollitia itaque repellendus deleniti fuga? Neque ipsam dignissimos officia. Nesciunt libero mollitia consequuntur adipisci, obcaecati nobis quas numquam quam molestiae at quidem illum deleniti delectus amet, quo reprehenderit itaque in consectetur. Autem excepturi perferendis quidem quam tenetur non laborum placeat? Voluptas nisi itaque ipsum repudiandae sunt labore porro tempora natus, nulla possimus animi quam iure incidunt rerum dolor, voluptate magni placeat, consequuntur quae voluptates enim illo debitis ducimus? Incidunt animi nobis neque quas sit modi. Odit veniam rerum sit, minus deleniti, nemo expedita incidunt molestias ipsam vitae quisquam atque obcaecati similique placeat facere porro quidem at ullam dicta. Beatae dolorem atque corrupti quibusdam. Repellendus numquam temporibus reiciendis consectetur odio, voluptate totam accusamus debitis dolorem ab repudiandae, vel possimus voluptatem veritatis, cum nisi doloremque eveniet dolores sapiente animi praesentium laudantium delectus sunt. Laboriosam distinctio maxime et rerum quis, doloribus magni laborum labore, sit omnis officiis doloremque cumque modi quisquam sed quae. Incidunt veritatis ut nemo accusantium qui atque dicta inventore itaque voluptates praesentium esse animi, enim deleniti reprehenderit beatae nulla expedita tempora rerum. Facilis laboriosam neque aliquam aliquid, similique porro necessitatibus repudiandae ad! Omnis eos quia laborum nostrum nobis accusamus porro voluptates quod tempore odio eaque cupiditate atque libero consequuntur sint nam reiciendis aliquam quasi velit cum, recusandae autem cumque officia vel? Omnis cum deserunt cupiditate molestias. Nemo a magni ducimus ipsum fugit assumenda accusamus repellendus sunt facere maxime ab, voluptatum molestiae ipsa fugiat delectus optio inventore error atque incidunt! Doloremque obcaecati cumque rerum nam exercitationem voluptate nesciunt illum vel eaque numquam et sit quaerat libero beatae at harum facere ab ad corporis commodi pariatur, laudantium quas quidem accusamus. Odio quia deserunt quaerat. Nulla dolor, ullam voluptate facere impedit quia fuga quo eos eum enim vero repellat, est necessitatibus quis. Quia in consequatur dolorum ipsum vitae necessitatibus esse odio laudantium, quos explicabo, odit maiores maxime veritatis, sed quis tenetur cupiditate nesciunt quo. Cum reprehenderit modi consequatur corporis enim placeat quasi natus qui eius, ipsa harum ex mollitia nostrum necessitatibus quas amet molestiae? Atque consectetur blanditiis, iste saepe ipsum natus dignissimos at praesentium enim. Nulla ducimus quas vero officia. Nulla magnam quia doloribus excepturi alias eos tempora dolore, eum quisquam et consectetur cumque saepe, non tempore illo quos maiores odio distinctio unde? Dolor sunt quasi dolores eligendi voluptas tenetur ratione, aliquam accusamus asperiores, illo ut veritatis nostrum. Ipsam officiis quasi voluptas fuga vel nesciunt minus possimus et debitis ab magni provident, accusamus voluptates, nulla quae nam exercitationem eos animi dolore labore. Sed ad, veritatis nemo qui doloribus sint deserunt error soluta quas tenetur odio voluptates officiis quia! Laborum iusto quibusdam natus dolorem explicabo ab in, repellendus cumque cum dolore ea rem commodi aspernatur sunt tenetur pariatur nesciunt hic, voluptas esse consequuntur aliquam. Magni dolorem tempora enim nostrum asperiores sapiente, nulla esse commodi aut quis dolores dolorum officia rerum! Sunt deserunt mollitia repellat dolorum delectus soluta ratione animi a maiores laudantium vero laboriosam, minima aperiam, provident veritatis tempora repellendus. Omnis rerum cumque hic dicta voluptate velit dolor minus non eaque nulla commodi illo, possimus explicabo necessitatibus nam nobis sapiente mollitia repellat aperiam? Neque odit rerum nulla nihil illo dolorum ratione, animi unde, fugiat dicta odio necessitatibus dolore. Cupiditate magni, delectus sit a laborum dolorem veritatis quod ullam rerum assumenda enim. Inventore accusantium autem distinctio esse eum excepturi possimus beatae omnis, cum suscipit reprehenderit est, optio, sed voluptate! Ullam facilis est ducimus tenetur quibusdam quidem officiis assumenda fugit quas? Quis ea, dolores incidunt alias tempora fugit deleniti eum fuga error, id suscipit. Non accusamus illo, porro impedit tenetur nesciunt totam consectetur. Possimus eos soluta, autem fuga nobis esse aliquam, praesentium totam animi sint assumenda vero, molestias quia quasi nisi quod! Minus iste quis rem, doloremque nisi quam eligendi, harum culpa ut incidunt, laboriosam eaque.
            </p>
            <div className="flex flex-col gap-2">
              <div>
                🔍 <strong>Explore Mode:</strong>
                <ul className="list-disc list-inside ml-4">
                  <li>Hover or click on areas to learn their names.</li>
                  <li>Perfect for studying and familiarizing yourself with the map!</li>
                </ul>
              </div>
              <div>
                🎯 <strong>Guess Mode:</strong>
                <ul className="list-disc list-inside ml-4">
                  <li>Test your knowledge by guessing the correct areas.</li>
                  <li>Zoom and pan carefully — precision matters!</li>
                  <li>After submitting, you'll see which guesses were correct.</li>
                </ul>
              </div>
              <div>
                🌙 <strong>Dark Mode:</strong>
                <p className="ml-4">Switch to dark mode for a more comfortable viewing experience.</p>
              </div>
              <div>
                ➡️ <strong>Controls:</strong>
                <p className="ml-4">Use the zoom buttons to zoom in/out and drag to pan around the map.</p>
              </div>
            </div>
          </div>
        </PopUp>


        <div className="w-full flex absolute top-0 right-0 justify-end">
          <div className=" p-3">
            <CircleHelp onClick={() => { setToggleHelp(true) }} className="text-white/80 hover:text-white cursor-pointer" />
          </div>
          <div className=" p-3">
            <Settings onClick={() => { setToggleSetting(true) }} className="text-white/80 hover:text-white cursor-pointer" />
          </div>
        </div>

        <div className="w-full">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white py-5 px-2">
            _MapaManiaPH_
          </h1>
          <p className="lg:text-sm text-[10px] mx-4 text-center text-gray-300 mb-6">
            Challenge your knowledge of the Philippine map!
          </p>
        </div>
        <div className="lg:w-1/3 w-full px-2 flex flex-col gap-4  mx-auto">
          <Link to={"/quickstart"}>
            <div className="button bg-gradient-to-b from-sky-400 to-sky-700 opacity-90 hover:opacity-100">
              <Button icon="🇵🇭" btnName="Quick Start" event={() => { }} />
            </div>
          </Link>

          <Link to={"/exploremap"}>
            <div className="bg-gradient-to-b from-emerald-400 to-emerald-700 button opacity-90 hover:opacity-100">
              <Button
                icon='🌍'
                btnName="Explore Map"
                event={() => { }}
              />
            </div>
          </Link>

          <Link to={"/challenge"}>
            <div className="bg-gradient-to-b from-red-400 to-red-500 button opacity-90 hover:opacity-100">
              <Button
                icon='⏱️'
                btnName=" Challenge Mode"
                event={() => { }}
              />
            </div>
          </Link>

          {/* Not yet sure to include feature lol */}
          <div className="relative cursor-not-allowed pointer-events-auto">
            <div className="absolute z-10 w-full h-full flex items-center justify-center text-lg rounded-full backdrop-blur-[2px]">
              🔒
            </div>
            <Link to={"/multiplayer"}>
              <div className="bg-gradient-to-b from-gray-400 to-gray-500 button opacity-90 hover:opacity-100">
                <Button
                  icon='⏱🔥'
                  btnName="Multiplayer"
                  event={() => { }}
                />
              </div>
              {/* bg-amber-600 hover:bg-amber-700 */}
            </Link>
          </div>


        </div>
      </div >
      <Footer />
    </>
  )
}

export default StartPage
