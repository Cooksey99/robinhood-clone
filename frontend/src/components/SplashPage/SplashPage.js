import './splashPage.css'

export const SplashPage = () => {



    return (
        <>
            <div id='splash-page-container'>
                <div className="splash-left-vertical">
                    <h1>Investing for Everyone</h1>
                    <h2>Commission-free investing, plus the tools you need to put your money in motion. Sign up and get your first stock for free. Certain limitations and fees apply.</h2>
                    <button className="splash-signup">Sign Up</button>
                </div>
                <div className='splash-right-vertical'>
                    <video autoplay="" controlslist="nodownload nofullscreen noremoteplayback" loop="" muted="" playsinline="" preload="auto" class="css-2jf4lk">
                        <source src="/us/en/_next/static/images/3x__327bf4cc768a323497d5aaa7416319c2.mp4" type="video/mp4" />
                        <img class="css-6qh47t" draggable="false" role="presentation" src="/us/en/_next/static/images/1x__36a396f664677ed80a2459d1dca75f00.png" srcset="/us/en/_next/static/images/1x__36a396f664677ed80a2459d1dca75f00.png, /us/en/_next/static/images/2x__c7dcadbbb72fc298e85e94844f68342c.png 2x, /us/en/_next/static/images/3x__7c5da6ba049983f3558423906f16f0af.png 3x" />
                    </video>
                </div>
            </div>
        </>
    )
}
