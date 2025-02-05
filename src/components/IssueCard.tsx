'use client'

import { Issue } from "@prisma/client";
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { useState } from "react";

export default function IssueCard({ issue }: { issue: Issue}) {

    const [open, setOpen] = useState(false)

  return <>
       <Dialog open={open} onOpenChange={setOpen}>
             <DialogContent className="font-semibold">
                  <DialogHeader>
                      <DialogTitle>{issue.gist}</DialogTitle>
                      <DialogDescription className="text-lg">{new Date(issue.createdAt).toLocaleDateString()}</DialogDescription>
                      <p className="text-gray-400">{issue.headline}</p>
                      <blockquote className="mt-3 border-l-2 border-gray-300 bg-secondary p-3">
                         <span className="">
                             {issue.start} - {issue.end}
                         </span>
                         <p className="text-base italic leading-relaxed text-start">
                            {issue.summary}
                         </p>
                      </blockquote>
                  </DialogHeader>
             </DialogContent>
       </Dialog>
        <div className="flex flex-col items-start justify-between gap-2 p-3 bg-card border rounded-lg font-semibold">
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl text-start border-b-2 border-gray-600">{issue.gist}</h3>
                    <p className="text-base text-gray-500">{issue.headline}</p>
                </div>
                <button onClick={() => setOpen(true)} className="p-2 rounded-lg bg-blue-600 text-white hover:opacity-80 duration-200">
                    Details
                </button>
        </div>
  </>
}