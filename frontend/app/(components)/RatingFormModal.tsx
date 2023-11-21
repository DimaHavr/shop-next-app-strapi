import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@nextui-org/react'
import { Rating } from '@smastrom/react-rating'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { AiOutlineUser } from 'react-icons/ai'
import { MdOutlineEmail } from 'react-icons/md'

import getHeaders from '../(utils)/getHeaders'

export default function RatingFormModal({
  isOpen,
  onOpenChange,
  productId,
}: {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  productId: number
}) {
  const router = useRouter()
  const [rating, setRating] = useState<number>(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      if (!name) {
        toast.error(`Введіть імя...`, {
          style: {
            borderRadius: '10px',
            background: '#fff',
            color: '#333',
          },
        })
        return
      }
      if (!email) {
        toast.error(`Введіть електронну пошту...`, {
          style: {
            borderRadius: '10px',
            background: '#fff',
            color: '#333',
          },
        })
        return
      }
      if (!rating) {
        toast.error(`Оберіть оцінку...`, {
          style: {
            borderRadius: '10px',
            background: '#fff',
            color: '#333',
          },
        })
        return
      }
      const response = await axios.post(
        `https://shop-strapi.onrender.com/api/reviews`,
        {
          data: {
            name,
            email,
            rating,
            comment,
            product: productId,
          },
        },
        {
          headers: getHeaders(),
        },
      )

      if (response.status === 200) {
        toast.success(`Відгук надіслано. Дякуємо!`, {
          style: {
            borderRadius: '10px',
            background: '#fff',
            color: '#333',
          },
        })
        setName('')
        setEmail('')
        setRating(0)
        setComment('')
        onOpenChange(false)
        router.refresh()
      } else {
        toast.error(`Помилка відправлення.`, {
          style: {
            borderRadius: '10px',
            background: '#grey',
            color: '#fff',
          },
        })
      }
    } catch (error) {
      toast.error(`Помилка відправлення.`, {
        style: {
          borderRadius: '10px',
          background: '#grey',
          color: '#fff',
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      backdrop='opaque'
      classNames={{
        backdrop: 'bg-[#292f46]/50 backdrop-opacity-40',
        closeButton: 'text-white-dis transition  hover:text-black-dis',
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement='top-center'
    >
      <ModalContent>
        <>
          <ModalHeader className='flex flex-col  items-center justify-center gap-1 bg-primary-green font-exo_2 text-xl text-white-dis'>
            Залишити відгук
          </ModalHeader>
          <ModalBody className=' bg-primary-green'>
            <div className=' flex justify-center'>
              <Rating
                style={{ maxWidth: 250 }}
                value={rating}
                onChange={setRating}
              />
            </div>
            <Input
              required
              autoFocus
              endContent={<AiOutlineUser size={30} />}
              label='Імя'
              minLength={3}
              value={name}
              className='rounded-2xl bg-white-dis'
              onChange={event => setName(event.target.value)}
              variant='bordered'
            />
            <Input
              required
              autoFocus
              type='email'
              endContent={<MdOutlineEmail size={30} />}
              value={email}
              onChange={event => setEmail(event.target.value)}
              label='Email'
              className='rounded-2xl bg-white-dis'
              variant='bordered'
            />
            <Textarea
              autoFocus
              label='Коментар'
              value={comment}
              onChange={event => setComment(event.target.value)}
              className='rounded-2xl bg-white-dis'
              variant='bordered'
            />
          </ModalBody>
          <ModalFooter className='flex items-center justify-center bg-primary-green text-white-dis'>
            <Button
              className='h-[60px] w-[300px] bg-black-dis font-exo_2 text-xl'
              disabled={isLoading}
              color='primary'
              onPress={handleSubmit}
            >
              Надіслати
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  )
}
