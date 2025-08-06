import type { FC } from 'react'

import { Trash2 } from 'lucide-react'

import { Button } from '@atoms/button'
import { Icon } from '@atoms/icon'
import { Input } from '@atoms/input'

type SearchSavedWifiProps = {
	onSearch: (value: string) => void
	defaultSearch?: string
	onClear: () => void
	selectedView: 'card' | 'list'
	setView: (view: 'card' | 'list') => void
}

export const SearchSavedWifi: FC<SearchSavedWifiProps> = ({ onSearch, defaultSearch, onClear, selectedView, setView }) => {
	return (
		<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4'>
			<Input placeholder='Search SSID...' defaultValue={defaultSearch} onChange={(e) => onSearch(e.target.value)} className='w-full md:w-1/2' />
			<div className='flex gap-2'>
				<Button size='sm' variant={selectedView === 'card' ? 'default' : 'outline'} onClick={() => setView('card')}>
					Card
				</Button>
				<Button size='sm' variant={selectedView === 'list' ? 'default' : 'outline'} onClick={() => setView('list')}>
					List
				</Button>
				<Button size='sm' variant='soft' colour='error' onClick={onClear}>
					<Icon IconComponent={Trash2} size='sm' />
				</Button>
			</div>
		</div>
	)
}
