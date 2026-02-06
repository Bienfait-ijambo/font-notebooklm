import * as React from "react";
import MindElixir from "mind-elixir";
import "mind-elixir/style.css";
import { BaseModal } from "@/components/base/BaseModal";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { useEffect } from "react";
import { closeMindMap } from "@/store/rightPanelSlice";

export const MindMapModel = () => {
  const [rerenderKey, setRerenderKey] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { mindMapModal } = useSelector((state: RootState) => state.rightPanel);

  // 🧠 Initialize MindElixir (only when rerenderKey changes)
  useEffect(() => {
    if (!containerRef.current) return;

    // If modal is not open, don't init
    if (!mindMapModal.modal) return;

    const options = {
      el: containerRef.current,
      direction: MindElixir.SIDE,
      draggable: true,
      editable: true,
    };

    // 🧩 Initialize Mind Map after rerender
    const mind = new MindElixir(options);
    mind.init(JSON.parse(mindMapModal.content));

    // ✅ Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [rerenderKey]); 


  useEffect(() => {
    if (mindMapModal.modal) {
      const timer = setTimeout(() => {
        setRerenderKey((prev) => prev + 1);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [mindMapModal.modal]);

  return (
    <BaseModal
      background={'#252526'}
      open={mindMapModal.modal}
      onOpenChange={() => dispatch(closeMindMap())}
      title="Mind Map"
      width={1450}
      height={670}
      footer={<></>}
    >
      <div
        ref={containerRef}
        key={rerenderKey}
        style={{
          height: "600px",
          width: "100%",
        }}
      />
    </BaseModal>
  );
};

export default MindMapModel;
