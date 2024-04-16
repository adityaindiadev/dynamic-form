import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@radix-ui/react-label';
import { Input } from "@/components/ui/input"


interface MyModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  Dialog_Title?: any;
  Dialog_Description?: any;
  Dialog_Footer?: any;
  children: React.ReactNode;
}

const MyModal: React.FC<MyModalProps> = ({ open, setOpen, Dialog_Title, Dialog_Description, Dialog_Footer, children=<></> }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{Dialog_Title}</DialogTitle>
          <DialogDescription>
            {Dialog_Description}
          </DialogDescription>
        </DialogHeader>
        
        {children}

        <DialogFooter>
          {Dialog_Footer}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default MyModal