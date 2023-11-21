import type { SliderValue } from '@nextui-org/react'
import { Accordion, AccordionItem, Slider } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'

import useCustomScrollbarLock from '@/app/(hooks)/useCustomScrollbarLock'

import type { ProductItem } from './ProductsList'
import type { IFilterData } from './Toolbar'

interface FilterSidebarProps {
  toggleFilterSidebar: () => void
  filterData: IFilterData
  filterPriceValues: any
  filterStartData: {
    data: ProductItem[]
    meta: {
      pagination: {
        total: number
      }
    }
  }
  setFilterData: (value: {}) => void
}
const FilterSidebar: React.FC<FilterSidebarProps> = ({
  toggleFilterSidebar,
  filterStartData,
  setFilterData,
  filterPriceValues,
  filterData,
}) => {
  const filteredDataSizes = filterStartData.data.reduce(
    (accumulator: any, item: any) => {
      const { size } = item.attributes.sizes.data[0].attributes
      if (!accumulator.includes(size)) {
        accumulator.push(size)
      }
      return accumulator
    },
    [],
  )
  const filteredDataColors = filterStartData.data.reduce(
    (accumulator: any, item: any) => {
      const colorName: string = item.attributes.colors.data[0].attributes.name
      const existingItems = accumulator.find(
        (existingItem: { colorName: string }) =>
          existingItem.colorName === colorName,
      )
      if (!existingItems) {
        accumulator.push({ colorName })
      }
      return accumulator
    },
    [],
  )
  const prices = filterStartData.data.map((item: any) => item.attributes.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const [colorValues, setColorValues] = useState<string[]>([
    ...(filterData.colorValues || ''),
  ])
  const [sizeValues, setSizeValues] = useState<string[]>([
    ...(filterData.sizeValues || ''),
  ])
  const [priceValues, setPriceValues] = useState<SliderValue>([
    ...filterPriceValues,
  ])

  const handleColorClick = (colorName: string) => {
    setColorValues((prevColors: any) => {
      return prevColors.includes(colorName)
        ? prevColors.filter((color: string) => color !== colorName)
        : [...prevColors, colorName]
    })
  }
  const handleSizeClick = (sizeItem: string) => {
    setSizeValues((prevSizes: any) => {
      return prevSizes.includes(sizeItem)
        ? prevSizes.filter((size: string) => size !== sizeItem)
        : [...prevSizes, sizeItem]
    })
  }

  const FilterSidebarRef = useRef<HTMLDivElement>(null)
  const onBackdropCloseFilterSidebar = useCallback(
    (event: { target: any; currentTarget: any }) => {
      if (event.target === event.currentTarget) {
        toggleFilterSidebar()
      }
    },
    [toggleFilterSidebar],
  )

  const handleEscKeyPressContent = useCallback(
    (event: { code: string }) => {
      if (event.code === 'Escape') {
        toggleFilterSidebar()
      }
    },
    [toggleFilterSidebar],
  )
  useCustomScrollbarLock({ handleEscKeyPressContent })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.1 } }}
      exit={{ transition: { duration: 0.1 } }}
      ref={FilterSidebarRef}
      onClick={onBackdropCloseFilterSidebar}
      className='fixed left-0 top-0 z-10 h-[100vh] w-full overflow-auto bg-modal-overlay'
    >
      <div className='border-b-1 border-white-dis/80 px-0 pt-4' />
      <motion.div
        initial={{ x: -500 }}
        animate={{ x: 0, transition: { duration: 0.3 } }}
        exit={{ x: -500, transition: { duration: 0.3 } }}
        className='fixed inset-y-0 left-0 z-30 mt-[87px] flex  w-full flex-col justify-between border-t-3 border-white-dis/80 bg-footer-gradient-linear-green pb-[20px]  pt-3  md:max-w-[400px]'
      >
        <div className='flex h-[100vh] flex-col justify-between gap-[10px] overflow-hidden'>
          <div className='flex items-center justify-between'>
            <h2 className='px-4 font-exo_2 text-xl font-semibold uppercase text-white-dis'>
              Фільтер
            </h2>
            <button
              type='button'
              className='white-dis-700 text-center'
              onClick={toggleFilterSidebar}
            >
              <MdOutlineClose
                className='h-10 w-10 fill-white-dis  transition-opacity hover:opacity-80 focus:opacity-80'
                aria-hidden='true'
              />
            </button>
          </div>
          <div className='border-b-1 border-white-dis/80 px-0' />

          <div className='flex h-[69vh] flex-col gap-4 overflow-y-auto px-4'>
            <div className='px-6'>
              <div className='flex h-full w-full max-w-md flex-col items-start justify-center gap-2'>
                <Slider
                  label='Ціна'
                  formatOptions={{ style: 'currency', currency: 'UAH' }}
                  step={1}
                  defaultValue={[minPrice, maxPrice]}
                  maxValue={maxPrice}
                  minValue={minPrice}
                  value={priceValues || [minPrice, maxPrice]}
                  onChange={setPriceValues}
                  classNames={{
                    base: 'max-w-md gap-3',
                    labelWrapper:
                      'font-exo_2 text-md font-semibold text-white-dis',
                    label: 'font-exo_2 text-lg font-semibold text-white-dis',
                  }}
                />
              </div>
            </div>
            <Accordion
              selectionMode='multiple'
              itemClasses={{
                base: 'max-w-md gap-3',
                title: 'font-exo_2 text-lg font-semibold text-white-dis',
                titleWrapper: 'font-exo_2 text-lg font-semibold text-white-dis',
              }}
            >
              <AccordionItem
                key='1'
                aria-label='Accordion 1'
                title={
                  <h3 className='line-clamp-2 text-left font-exo_2 text-xl font-semibold text-white-dis '>
                    Колір
                  </h3>
                }
              >
                <ul className='mb-5 flex flex-wrap justify-center gap-2'>
                  {filteredDataColors.map((item: { colorName: string }) => {
                    return (
                      <li key={item.colorName}>
                        <button
                          type='button'
                          className={`${
                            colorValues.includes(item.colorName) &&
                            'rounded-2xl border-1  border-white-dis text-white-dis shadow-box'
                          }`}
                          onClick={() => handleColorClick(item.colorName)}
                        >
                          <span className='px-3 py-2 font-exo_2 text-md text-white-dis'>
                            {item.colorName}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </AccordionItem>
              <AccordionItem
                key='2'
                aria-label='Accordion 2'
                title={
                  <h3 className='line-clamp-2 text-left font-exo_2 text-xl font-semibold text-white-dis '>
                    Розмір
                  </h3>
                }
              >
                <ul className='mb-5 flex flex-wrap justify-center gap-2'>
                  {filteredDataSizes.map((item: string) => {
                    return (
                      <li key={item}>
                        <button
                          className={`${
                            sizeValues.includes(item) &&
                            'rounded-2xl border-1  border-white-dis text-white-dis shadow-box'
                          }`}
                          type='button'
                          onClick={() => handleSizeClick(item)}
                        >
                          <span className='px-3 py-2 font-exo_2 text-md text-white-dis'>
                            {item}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </AccordionItem>
            </Accordion>
          </div>
          <button
            onClick={() => {
              setFilterData({
                priceValues: [minPrice, maxPrice],
              })
              toggleFilterSidebar()
            }}
            type='button'
            className='mx-4 rounded-2xl bg-white-dis p-4 text-center font-exo_2 text-lg font-bold text-primary-green shadow-button transition-all duration-300 hover:scale-[1.03] hover:opacity-80  focus:scale-[1.03] focus:opacity-80 '
          >
            Очистити фільтер
          </button>
          <button
            onClick={() => {
              setFilterData({
                colorValues,
                priceValues,
                sizeValues: [...sizeValues],
              })
              toggleFilterSidebar()
            }}
            type='button'
            className='mx-4 rounded-2xl bg-white-dis p-4 text-center font-exo_2 text-lg font-bold text-primary-green shadow-button transition-all duration-300 hover:scale-[1.03] hover:opacity-80  focus:scale-[1.03] focus:opacity-80 '
          >
            Зберегти
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default FilterSidebar
