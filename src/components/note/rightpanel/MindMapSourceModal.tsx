import { Search } from "lucide-react";
import * as React from "react";
import MindElixir from "mind-elixir";
import "mind-elixir/style.css";
import { Button } from "@/components/ui/button";
import { BaseModal } from "@/components/base/BaseModal";

export const MindMapModel = () => {
  const [open, setOpen] = React.useState(false);
  const [mindMap, setShowMindMap] = React.useState(false);


  
  // Example sources (replace with API results later)
 const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const options = {
      el: containerRef.current,
      direction: MindElixir.SIDE,
      draggable: true,
      editable: true,
    };



const data={
  "nodeData": {
    "id": "root",
    "topic": "Generative AI Fundamentals",
    "children": [
      {
        "id": "core",
        "topic": "Core Definition & Concepts",
        "children": [
          {
            "id": "core_1",
            "topic": "Creates New Original Content",
            "children": [
              {
                "id": "core_1_1",
                "topic": "Not analysis or categorization"
              },
              {
                "id": "core_1_2",
                "topic": "Distinct from Traditional AI"
              }
            ]
          },
          {
            "id": "core_2",
            "topic": "Foundation: Large Language Models (LLMs)",
            "children": [
              {
                "id": "core_2_1",
                "topic": "Trained on massive text datasets"
              }
            ]
          }
        ]
      },
      {
        "id": "process",
        "topic": "Two-Phase Process",
        "children": [
          {
            "id": "process_1",
            "topic": "1. Training & Pattern Recognition",
            "children": [
              {
                "id": "process_1_1",
                "topic": "Ingests vast training data",
                "children": [
                  {
                    "id": "process_1_1_1",
                    "topic": "Text, images, code, etc."
                  }
                ]
              },
              {
                "id": "process_1_2",
                "topic": "Learns underlying structures",
                "children": [
                  {
                    "id": "process_1_2_1",
                    "topic": "Statistical relationships"
                  },
                  {
                    "id": "process_1_2_2",
                    "topic": "Recurring patterns"
                  }
                ]
              },
              {
                "id": "process_1_3",
                "topic": "Builds generalized understanding",
                "children": [
                  {
                    "id": "process_1_3_1",
                    "topic": "Example: Pattern of a cat"
                  }
                ]
              }
            ]
          },
          {
            "id": "process_2",
            "topic": "2. Content Creation",
            "children": [
              {
                "id": "process_2_1",
                "topic": "Triggered by a user prompt",
                "children": [
                  {
                    "id": "process_2_1_1",
                    "topic": "Quality of prompt matters"
                  }
                ]
              },
              {
                "id": "process_2_2",
                "topic": "Predicts and generates novel output",
                "children": [
                  {
                    "id": "process_2_2_1",
                    "topic": "Statistically similar to training data"
                  },
                  {
                    "id": "process_2_2_2",
                    "topic": "Not a direct copy"
                  }
                ]
              },
              {
                "id": "process_2_3",
                "topic": "Example: Cat on a moon"
              }
            ]
          }
        ]
      },
      {
        "id": "characteristics",
        "topic": "Key Characteristics",
        "children": [
          {
            "id": "char_1",
            "topic": "Primary Function: Creation",
            "children": [
              {
                "id": "char_1_1",
                "topic": "Acts as a creative engine"
              }
            ]
          },
          {
            "id": "char_2",
            "topic": "Versatile Output Types",
            "children": [
              {
                "id": "char_2_1",
                "topic": "Text: Essays, code, emails"
              },
              {
                "id": "char_2_2",
                "topic": "Images: Photos, artwork"
              },
              {
                "id": "char_2_3",
                "topic": "Audio: Music, speech"
              },
              {
                "id": "char_2_4",
                "topic": "Video: Animations, scenes"
              }
            ]
          },
          {
            "id": "char_3",
            "topic": "Prompt-Driven"
          }
        ]
      },
      {
        "id": "remember",
        "topic": "Important Points to Remember",
        "children": [
          {
            "id": "rem_1",
            "topic": "Output is novel and unique",
            "children": [
              {
                "id": "rem_1_1",
                "topic": "Not retrieved or copied"
              }
            ]
          },
          {
            "id": "rem_2",
            "topic": "Mimics human creativity",
            "children": [
              {
                "id": "rem_2_1",
                "topic": "Based on statistical patterns"
              }
            ]
          },
          {
            "id": "rem_3",
            "topic": "Algorithm: Rules for generation",
            "children": [
              {
                "id": "rem_3_1",
                "topic": "Processes data and creates"
              }
            ]
          },
          {
            "id": "rem_4",
            "topic": "Revolutionizes industries",
            "children": [
              {
                "id": "rem_4_1",
                "topic": "Creative fields, marketing"
              },
              {
                "id": "rem_4_2",
                "topic": "Software development"
              },
              {
                "id": "rem_4_3",
                "topic": "Entertainment"
              }
            ]
          }
        ]
      }
    ]
  }
}
    const mind = new MindElixir(options);
    mind.init(data);

    
    if(mindMap){
       

         return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
    }
    // ✅ Safe cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };

  }, [open,mindMap]);

  return (
    <div>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open Dialog - 
      </Button>
      <BaseModal
     background={'#252526'}
        open={open}
        onOpenChange={setOpen}
        title="Mind Map"
        width={1450}
        height={670}
        footer={
          <>
           
          </>
        }
      >
          {/* Search Section */}
          <button onClick={()=>setShowMindMap(true)}>cick here</button>
         <div
        ref={containerRef}
        style={{
          height: "600px",
          width: "100%",
        }}
      />

      </BaseModal>
    </div>
  );
};

export default MindMapModel;
