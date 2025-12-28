
import type { NoteType } from '@/types/note-types';
import { formatDate } from '@/util/formatDate';
import { truncateTitle } from '@/util/truncateTitle';

import DefaultImage from '@/assets/default.png'
import { Ellipsis } from 'lucide-react';



type NoteCardProps = {
    notebooks: NoteType[];
    viewNoteDetail:(id:string)=>void
};

const cards = [
  'bg1',
  'bg2',
  'bg3',
  'bg4',
  'bg5',
  'bg6',
  'bg7',
  'bg8',
  'bg9',
  'bg10'
  
];

export function getRandomBg() {
  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
}

const NoteCard = ({ notebooks ,viewNoteDetail}: NoteCardProps) => {

    const cards=['bg-blue-50','bg-red-50','bg-orange-50','bg-green-50','bg-yellow-50','bg-gray-50']

    return (<>
        {
            notebooks.map((note: NoteType) => (

                <div
                    key={note._id}
                    className={`relative p-4 rounded-xl shadow-sm hover:shadow-md transition h-52 ${getRandomBg()}`}
                    onClick={()=>viewNoteDetail(note?._id)}
                >

                    {/* Image at top */}
                    <div className="h-24">
                      {note?.image && (
  typeof note.image === "string" && note.image.startsWith("http")
    ? (
        

         <img
                            src={note.image || DefaultImage} // fallback if no image
                            onError={(e) => {
                                e.currentTarget.src = DefaultImage;
                            }}
                            className="pt-2"
                            width={100}
                        /> 
      )
    : (
        <span style={{ fontSize: "4rem" }}>
          {note.image}
        </span>
      )
)}
                     
                    </div>

                    {/* Content */}
                    <div className="flex flex-col  justify-between ">
                        <h2 className="text-xl  font-semibold text-gray-800 line-clamp-2">
                            {truncateTitle(note.title)}
                        </h2>
                        <p className="text-xs text-gray-500 pt-2">
                            {formatDate(note.createdAt)} • {note?.docs?.length } sources
                        </p>
                    </div>
                </div>
            ))
        } </>);
}

export default NoteCard;