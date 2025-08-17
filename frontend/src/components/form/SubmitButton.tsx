import { motion } from 'framer-motion'
import { Check, ChevronRight, Zap } from 'lucide-react'
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface RotatingCompleteButtonProps {
  onClick: () => void;
}

const RotatingCompleteButton = ({ onClick }: RotatingCompleteButtonProps) => {
  const [isOpen, setIsOpen] = React.useState(false)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false)
      }, 2000)
    }
  }, [isOpen])

  return (
    <Button onClick={onClick}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {isOpen ? (
          <span className="flex rotate-180 items-center gap-1 text-sm font-medium">
            Marked as complete <Check size={16} />
          </span>
        ) : (
          <span className="flex items-center gap-1 text-sm font-medium">
            Mark as complete <ChevronRight size={16} />
          </span>
        )}
      </motion.span>
    </Button>
  )
}

export default RotatingCompleteButton