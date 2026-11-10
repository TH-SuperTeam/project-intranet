import { Status } from "../../../types/Status"
import { ChevronDown } from "lucide-react"

type UserStatusSelectProps = {
	value: Status
	onChange: (newStatus: Status) => void
	disabled?: boolean
}

const statusOptions: { value: Status; label: string }[] = [
	{ value: Status.ACTIVE, label: "Aktiv" },
	{ value: Status.SUSPENDED, label: "Avstängd" },
	{ value: Status.GRADUATED, label: "Examinerad" },
	{ value: Status.WITHDRAWN, label: "Avbruten" },
	{ value: Status.TERMINATED, label: "Avslutad" },
	{ value: Status.ON_LEAVE, label: "Tjänstledig" },
	{ value: Status.PAUSED, label: "Pausad" },
]

const statusColors: Record<Status, string> = {
	[Status.ACTIVE]: "border-[#b5d8c3] bg-[#dceee3] text-[#276749]",

	[Status.SUSPENDED]: "border-[#e5b9ba] bg-[#f3dedd] text-[#923f48]",

	[Status.GRADUATED]: "border-[#bdcfe8] bg-[#dfe8f5] text-[#345c91]",

	[Status.WITHDRAWN]: "border-[#e8cbb4] bg-[#f5e5d7] text-[#965b35]",

	[Status.TERMINATED]: "border-[#cdd0d5] bg-[#e8e9ec] text-[#4b5563]",

	[Status.ON_LEAVE]: "border-[#d2c1e2] bg-[#eae2f2] text-[#72518c]",

	[Status.PAUSED]: "border-[#e2d59c] bg-[#f2eacb] text-[#806522]",
}

const UserStatusSelect = ({
	value,
	onChange,
	disabled = false,
}: UserStatusSelectProps) => {
	return (
		<div className="relative w-36 shrink-0">
			<select
				aria-label="Användarstatus"
				value={value}
				onChange={event => onChange(event.target.value as Status)}
				disabled={disabled}
				className={`w-full appearance-none rounded-lg border py-2 pl-3 pr-9 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${statusColors[value]}`}
			>
				{statusOptions.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>

			<ChevronDown
				size={16}
				aria-hidden="true"
				className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
			/>
		</div>
	)
}

export default UserStatusSelect
