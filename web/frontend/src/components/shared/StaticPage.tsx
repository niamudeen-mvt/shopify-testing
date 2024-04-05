
import { FaRegSquareCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";


const StaticPage = () => {
  return <div>
    <h1 className="my-6 text-center font-semibold text-4xl">Link a Store to your Account</h1>
    {/* section 1 */}
    <div className="grid gap-4">
      <h3 className="font-semibold">
      Step 1. Open your Shopify Admin and create a custom app
      </h3>
      <ul className="grid gap-4 text-sm">
        <li>
        1.1. Head to your Shopify Admin and open your App and sales channel settings section.
        </li>
        <li>
        1.2. In the upper right, click Develop apps.
        </li>
        <li>
        1.3. In the upper right again, click Create an app.
        </li>
        <li>
        1.3.1 If you don't see the Create an app button in the upper right, click on Allow custom app development first.
        </li>
        <li>
        1.4. Enter the name of the app such as 
        Synchronizer Master
        and click Create app.
        </li>
      </ul>
      <video autoPlay={false} controls  src="https://kopy.b-cdn.net/kopy-onboarding-1.webm"></video>
    </div>


    {/* section 2 */}
    <div className="grid gap-4 my-4">
      <h3 className="font-semibold my-4">
      Step 2. Configure the Admin API Scopes
      </h3>
      <ul className="grid gap-4 text-sm">
        <li>
        2.1. Inside the 
Synchronizer Master
 app you've just created, click on Configure Admin API scopes.
        </li>
        <li>
        2.2. Check the following items:

            <div className="grid gap-4 ml-6 my-4">
              <ul>
                <li className="flex gap-2 items-center"><FaRegSquareCheck/>read_products</li>
                <li className="flex gap-2 items-center"><FaRegSquareCheck/>write_products</li>
                <li className="flex gap-2 items-center"><FaRegSquareCheck/>read_locales</li>
              </ul>
              
              <div className="bg-yellow-200 p-5 rounded-xl font-semibold">
              ⚠️ Please double check that the scopes below are not checked instead of the ones above.
              </div>

              <ul className="text-red-500">
                <li className="flex gap-2 items-center"><RxCrossCircled/>read_product_listings</li>
                <li className="flex gap-2 items-center"><RxCrossCircled/>write_product_listings</li>
              </ul>
            </div>
        </li>
        <li>
        2.3. In the upper right again, click Save.
        </li>

        <video autoPlay={false} controls  src="https://kopy.b-cdn.net/kopy-onboarding-2.webm"></video>

      </ul>
    </div>

     {/* section 3 */}
     <div className="grid gap-4">
      <h3 className="font-semibold my-4">
      Step 3. Obtain the Access Token and finish linking your store
      </h3>
      <ul className="grid gap-4 text-sm">
        <li>
        3.1. Inside the 
Synchronizer Master
 app you've created, click on API credentials.
        </li>
        <li>
        3.2. Click on Install app, then click on Install again.
        </li>
        <li>
        3.3. Click on Reveal token once and copy your Access Token.

        <div className="bg-red-600 p-5 rounded-xl font-semibold text-white my-4">
        WARNING! You will only be able to copy your Access Token once. We recommend that you write it down somewhere just in case. If forgotten, you will need to repeat all the steps above to obtain a new Access Token
        </div>
        </li>

        <li>
        3.4. Paste your Access Token below.
        </li>
        <video autoPlay={false} controls  src="https://kopy.b-cdn.net/kopy-onboarding-3.webm"></video>
      </ul>
    </div>

       {/* section 4 */}
    <div className="grid gap-4 my-4">
      <h3 className="font-semibold my-4">
      Step 4. Obtain your store's myshopify.com domain
      </h3>
      <ul className="grid gap-4 text-sm">
        <li>
        4.1. Inside your Shopify Admin click on Settings.
        </li>
        <li>
        4.2. Head to the Domains section.
        </li>
        <li>
        4.3. Copy your myshopify.com domain.
        </li>
        <li>
        4.4. Paste your myshopify.com domain below.
        </li>
        <li>
        4.5. Click Link Store and voilà, you have now successfully linked your store to your account 🥳.
        </li>
        <video autoPlay={false} controls src="https://kopy.b-cdn.net/kopy-onboarding-4.webm"></video>
      </ul>
    </div>
  
  </div>

}

export default StaticPage