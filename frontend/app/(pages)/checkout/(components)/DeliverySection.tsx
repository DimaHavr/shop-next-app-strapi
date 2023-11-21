/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import axios from 'axios'
import { debounce } from 'lodash'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import AddAnimation from '@/app/(components)/AddAnimation'
import { useAppDispatch, useAppSelector } from '@/app/(redux)/hooks'
import { setOrder } from '@/app/(redux)/order/orderSlice'
import { selectOrder } from '@/app/(redux)/order/selectors'

interface City {
  Ref: string
  Description: string
}

interface Warehouse {
  SiteKey: string
  Description: string
}

const DeliverySection = () => {
  const order = useAppSelector(selectOrder)
  const dispatch = useAppDispatch()
  const apiKey = 'c75de6f5d503c098726768ca49c79618'
  const [filterCityValue, setFilterCityValue] = useState('')
  const [filterWarehouseValue, setFilterWarehouseValue] = useState('')
  const [filteredCities, setFilteredCities] = useState<City[]>([])
  const [warehouses, setWarehouses] = useState<Warehouse[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedKeyCityRef, setSelectedKeyCityRef] =
    useState<React.Key | null>(null)
  const [isUserSelecting, setIsUserSelecting] = useState(false)

  const getFilteredCities = async () => {
    setLoading(true)
    const modelName = 'Address'
    const calledMethod = 'getCities'
    const methodProperties = {
      FindByString: filterCityValue,
      Page: '1',
      Limit: '10',
    }
    try {
      if (!filterCityValue) {
        setLoading(false)
        setFilteredCities([])
        return
      }
      const response = await axios.post(
        'https://api.novaposhta.ua/v2.0/json/',
        {
          apiKey,
          modelName,
          calledMethod,
          methodProperties,
        },
      )
      const cities: City[] = response.data.data
      setFilteredCities(cities)
      setWarehouses([])
      setLoading(false)
    } catch (error) {
      setLoading(false)
      throw new Error('Error')
    }
  }

  const getFilteredWarehouses = async () => {
    const modelName = 'Address'
    const calledMethod = 'getWarehouses'
    const methodProperties = {
      CityRef: selectedKeyCityRef,
      FindByString: filterWarehouseValue,
      Page: '1',
      Limit: '10',
    }
    try {
      const response = await axios.post(
        'https://api.novaposhta.ua/v2.0/json/',
        {
          apiKey,
          modelName,
          calledMethod,
          methodProperties,
        },
      )
      const res: Warehouse[] = response.data.data
      setWarehouses(res)
    } catch (error) {
      throw new Error('Error')
    }
  }

  const handleFilterCityDebounced = debounce(getFilteredCities, 300)
  const handleFilterWarehouseDebounced = debounce(getFilteredWarehouses, 300)

  const handleFilterCityInputChange = (value: string) => {
    setFilterCityValue(value)
    if (!isUserSelecting) {
      handleFilterCityDebounced()
    }
  }
  const handleFilterWarehouseInputChange = (value: string) => {
    setFilterWarehouseValue(value)
  }
  const onSelectionChangeCityRef = (key: React.Key) => {
    setIsUserSelecting(true)
    setSelectedKeyCityRef(key)
  }
  const onSelectionChangeWarehouse = (key: React.Key) => {
    setIsUserSelecting(true)
    const selectedWarehouseData = warehouses.find(item => item.SiteKey === key)
    if (selectedWarehouseData) {
      dispatch(
        setOrder({ ...order, deliveryData: { ...selectedWarehouseData } }),
      )
      setIsUserSelecting(true)
      toast.success(`Вибрано ${selectedWarehouseData.Description}`, {
        style: {
          borderRadius: '10px',
          background: '#fff',
          color: '#333',
        },
      })
    }
  }

  useEffect(() => {
    if (!selectedKeyCityRef) {
      setIsUserSelecting(false)

      return
    }
    handleFilterWarehouseDebounced()
    setIsUserSelecting(false)
  }, [selectedKeyCityRef])

  return (
    <div className='flex flex-col justify-start gap-3'>
      <h3 className='font-exo_2 text-xl font-bold'>3. Дані доставки</h3>
      <div className='flex flex-col'>
        <div className='flex flex-col items-center justify-center gap-4'>
          <Image
            src='/icons/Nova_Poshta_2014_logo.svg'
            width={150}
            height={100}
            alt='selected-image'
          />
          <Autocomplete
            defaultItems={filteredCities}
            variant='underlined'
            label='Знайти населений пункт'
            classNames={{
              base: 'w-full font-exo_2',
            }}
            onInputChange={handleFilterCityInputChange}
            onSelectionChange={onSelectionChangeCityRef}
          >
            {city => (
              <AutocompleteItem key={city.Ref} value={[filterCityValue]}>
                {loading ? <p>Пошук...</p> : city.Description}
              </AutocompleteItem>
            )}
          </Autocomplete>
          <Autocomplete
            defaultItems={warehouses}
            variant='underlined'
            label='Вибрати пункт видачі'
            classNames={{
              base: 'w-full font-exo_2 text-lg',
              listboxWrapper: 'font-exo_2 text-lg',
            }}
            onInputChange={handleFilterWarehouseInputChange}
            onSelectionChange={onSelectionChangeWarehouse}
          >
            {warehouse => (
              <AutocompleteItem
                key={warehouse.SiteKey}
                value={[filterWarehouseValue]}
              >
                {warehouse.Description}
              </AutocompleteItem>
            )}
          </Autocomplete>
          <Image
            src='/icons/Ukrposhta-ua.svg'
            width={180}
            height={100}
            alt='selected-image'
          />
          <div className='flex items-center gap-2'>
            <p className='font-exo_2 text-lg font-bold'>В розробці...</p>
            <AddAnimation path='/json/api-animation.json' id='lottie-container'>
              <div
                id='lottie-container'
                style={{ width: '60px', height: '60px' }}
              />
            </AddAnimation>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeliverySection
