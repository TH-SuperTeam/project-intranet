import { useEffect, useState } from "react"
import { Copy, Check } from "lucide-react"
import styles from "./CopyEmailButton.module.css"

interface CopyEmailButtonProps {
	email: string
}

const CopyEmailButton = ({ email }: CopyEmailButtonProps) => {
	const [feedback, setFeedback] = useState<"success" | "error" | null>(null)

	useEffect(() => {
		if (feedback === null) return

		const timer = setTimeout(() => {
			setFeedback(null)
		}, 2000)

		return () => clearTimeout(timer)
	}, [feedback])

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(email)
			setFeedback("success")
		} catch {
			setFeedback("error")
		}
	}

	return (
		<div className={styles.container}>
			<button
				type="button"
				className={styles.copyButton}
				onClick={handleCopy}
				aria-label={`Kopiera e-postadress: ${email}`}
			>
				{feedback === "success" ? (
					<Check size={18} />
				) : (
					<Copy size={18} />
				)}
			</button>

			{feedback === "success" && (
				<span className={styles.feedback} role="status">
					E-postadress kopierad!
				</span>
			)}

			{feedback === "error" && (
				<span className={styles.feedback} role="alert">
					Kunde inte kopiera e-postadress.
				</span>
			)}
		</div>
	)
}

export default CopyEmailButton
