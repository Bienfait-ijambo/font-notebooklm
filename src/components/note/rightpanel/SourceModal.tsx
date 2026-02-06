
import { BaseModal } from "@/components/base/BaseModal";
import { Button } from "@/components/ui/button";
import type { AppDispatch, RootState } from "@/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import { closeSourceModal } from "@/store/rightPanelSlice";




export const SourceModal = () => {
  const [open, setOpen] = React.useState(false)
  const dispatch = useDispatch<AppDispatch>();

  const { sourceModal } = useSelector((state: RootState) => state.rightPanel);

  return (




    <div>


      <BaseModal
        open={sourceModal?.modal}
        onOpenChange={setOpen}
        title={sourceModal?.source_type}
        description=""
        width={800}
        height={700}
        footer={
          <>
            <Button variant="outline" onClick={() => dispatch(closeSourceModal())}>
              Close Modal
            </Button>

          </>
        }
      >

        <div
          className="grid gap-3 "
        >

          <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
            a: ({ node, ...props }) => (
              <a className="text-blue-500 underline hover:text-blue-700" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc ml-6 mb-2" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal ml-6 mb-2" {...props} />
            ),
            li: ({ node, ...props }) => <li className="mb-1" {...props} />,
            h1: ({ node, ...props }) => <h1 className="text-2xl  font-bold text-gray-800 my-2" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-xl font-semibold text-gray-700 my-2" {...props} />,
            strong: ({ node, ...props }) => <strong className="font-bold text-gray-700" {...props} />,
          }}>
            {`
                # ${sourceModal?.title}


                  ${sourceModal?.content}
            `}
          </ReactMarkdown>

        </div>
      </BaseModal>
    </div>

  );
}

