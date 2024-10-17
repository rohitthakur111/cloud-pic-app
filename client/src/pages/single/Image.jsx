import { useEffect, useState } from "react";
import ImageCard from "../../components/ImageCard"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { GoDownload } from "react-icons/go";
import { imageLoading, imagesList, removeImageAsync } from "../../feature/images/imageSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import SingleImage from "../../components/SingleImage";
import Loading from "../../components/Loading";
import SingleLoading from "../../components/SingleLoading";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { saveWhishItemAsync, whishItems } from "../../feature/whish/whishSlice";
import { getImage } from "../../feature/images/service";
import { confirmCheckout, getPremium } from "../../feature/order/service";
import { TbPremiumRights } from "react-icons/tb";
import { createOrderAsync, orderList } from "../../feature/order/orderSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { authToken } from "../../feature/auth/authSlice";
import { showHideModal } from "../../feature/visual/visualSlice";

const Image = ()=>{
    const dispatch = useDispatch()
    const images = useSelector(imagesList)
    const loadingState = useSelector(imageLoading)
    const navigate = useNavigate()

    const loginToken = useSelector(authToken)


    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');

    const order = useSelector(orderList)

    const {id} =  useParams()
    const [downloading,setDownloading] = useState(false)

    // useEffect(()=>{
    //     if(id && images?.length>0){
    //         const image = images.find(image=> image?._id === id)
    //         if(!image) setError('! Image not Found')
    //         setImage(image)
    //     }
    // },[id, images])

    useEffect(()=>{

        if(id){
            (async()=>{
                setLoading(true)
                const { image } = await getImage(id)
                if(!image) setError('! Image not Found')
                setImage(image)
                setLoading(false)
            })()
        }

    },[id])
    // Whish data
    const whish = useSelector(whishItems)
    const [whishLoading, setWhishLoading] = useState(false)
    const [isWhishItem, setWhishItem] = useState(false)

    useEffect(()=>{
       if(image){
        const index = whish.indexOf(image?._id)
        setWhishItem(index>=0)
       }
    },[image, whish])

    const downloadImage = async({imageUrl, title})=>{
        try {
            const response = await fetch(imageUrl, {
                mode: 'cors',
              });
              const blob = await response.blob();
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              let name = title?.replace(/ /g, '-');
              link.download = `${name}.jpg`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
          } catch (error) {
            console.error('Image download failed:', error);  
          }
    }

    // handle delete image 
    const handleDeleteImage = async (id)=>{
       const response =  await dispatch(removeImageAsync(id))
       if(response?.payload?.status === "success"){
            setImage(null)
            toast.success('Image deleted Successfully')
            navigate('/')
        }else toast.error('Image is not uploaded!')
    }

    // Checkout success
    const location = useLocation();
    const sessionId = new URLSearchParams(location.search).get('session_id');

    useEffect(() => {
        (async () => {
            if (sessionId) {
                const data = await confirmCheckout(sessionId)
                if(data.status === "paid"){
                    setDownloading(true)
                   await dispatch(createOrderAsync({id, sessionId}))
                   setDownloading(false)
                }
                
            }
        })()
    }, [sessionId]);

    // Check order or not
    const [isOrder,setIsOrder] = useState(false)
    useEffect(()=>{
       if(image && image?.imageType ==="paid" && order?.length >0){
            const image = order?.find(item => item?.image?._id === id)
            if(image)setIsOrder(true)
            else setIsOrder(false)
       }
    },[order,image])

    // handle download premium image 
    const handleDownloadPremium = async()=> {
        if(!loginToken){
            dispatch(showHideModal(true))
            return;
        }

        setDownloading(true)
        try{
            await getPremium(id)
        }catch(err){
            setDownloading(false)
        }
        
    }
    return(
        <>
        {loadingState || loading &&  <>
        <SingleLoading />
        <div className='flex flex-row flex-wrap gap-y-4 md:gap-y-2 justify-center md:justify-start'>
            {Array(6)?.fill()?.map((_,i)=><div className='w-full md:w-1/2 lg:w-1/3 2xl:w-1/4'  key={i}> <Loading    /> </div>)}
        </div>
        </>
        }
        
        {error && <p className="text-3xl font-medium text-error">{error}</p>}

        {!loadingState && image && !error && 
        <div className="flex flex-col items-start lg:flex-row gap-8  my-4 pb-8 border-b ">
            <div className="lg:w-1/2 flex flex-col md:flex-row">
                <SingleImage image={image}/>
            </div>
            <div className="lg:w-1/2 md:p-4">
                <h2 className="text-xl font-semibold mb-4">{image?.title}</h2>
                <p className="mb-4">{image?.description}</p>
                {image?.imageType === 'paid' && 
                    <p className="mb-4">
                        Image Price : <span className="font-semibold text-yellow-500">{image.price} {image?.currency} </span> 
                    </p>
                }
                <div className="flex">
                    {/* Premium Not downloded */}
                    {image?.imageType === 'paid' && !isOrder &&
                    <button 
                        type="button"
                        className="btn bg-yellow-400 text-black-100 transition-colors duration-500 ease-in-out  hover:bg-yellow-300"
                        onClick={ async ()=> await handleDownloadPremium()}
                    >
                        <span className="text-xl font-semibold"><TbPremiumRights /></span> Get Premium 
                        {downloading &&
                        <span className='animate-spin font-bold text-base font-medium ms-2'>
                            <AiOutlineLoading3Quarters />
                        </span>
                        }
                    </button>
                    }

                    {/* Premium downloded */}
                    {image?.imageType === 'paid' && isOrder &&
                    <button 
                        type="button"
                        className="btn bg-yellow-400 text-black-100 hover:bg-yellow-300"
                        onClick={()=> downloadImage(image)}
                    >
                        <span className="text-xl font-semibold"><TbPremiumRights /></span> Download Premium
                    </button>
                    }

                    {image?.imageType !== 'paid' &&
                    <button 
                        className="btn bg-teal-500 text-white text-uppercase transition-colors duration-500 ease-in-out hover:bg-white hover:text-teal-500 hover:border-teal-400"
                        onClick={()=>downloadImage(image)}
                    >
                        <GoDownload /> Free Download Now
                    </button>
                    
                    }
                    <button 
                        className="px-4 py-2 text-2xl rounded-md text-error text-uppercase ms-2"
                        onClick={ async()=> { 
                            if(!loginToken){
                                dispatch(showHideModal(true))
                                return ;
                            }
                            try{
                                setWhishLoading(true)
                                await dispatch(saveWhishItemAsync(image?._id))
                                 setWhishLoading(false)
                            }catch(err){ setWhishLoading(false) }
                            
                        }}
                    > 
                    <span className={whishLoading? 'animate-ping' : ''}>
                        {isWhishItem ? 
                        <FaHeart />
                        :
                        <FaRegHeart />
                        }
                    </span>
                      
                    </button>
                </div>
                
            </div>
            
        </div>
        }
        
        <div className="mt-8 ">
            <div className='flex justify-center md:justify-start flex-wrap gap-y-4 md:gap-y-2'>
                {images?.filter((image) => image?._id !== id)
                    .map(((image,i) => (
                        <div className='w-full md:w-1/2 lg:w-1/3 2xl:w-1/4' key={i}>
                            <Link to={`/image/${image?._id}`}>
                                <ImageCard width={96} height={96} image={image}/>
                            </Link>
                        </div>
                    )))
                }
            </div>
        </div>
        </>
    )
}

export default Image;
