
import type { NoteType } from '@/types/note-types';
import { formatDate } from '@/util/formatDate';
import { truncateTitle } from '@/util/truncateTitle';

import DefaultImage from '@/assets/default.png'
import { Ellipsis } from 'lucide-react';



type NoteCardProps = {
    notebooks: NoteType[];
    viewNoteDetail:(id:string)=>void
};
const NoteCard = ({ notebooks ,viewNoteDetail}: NoteCardProps) => {
    return (<>
        {
            notebooks.map((note: NoteType) => (

                <div
                    key={note._id}
                    className={`relative p-4 rounded-xl shadow-sm hover:shadow-md transition h-52 bg-white`}
                    onClick={()=>viewNoteDetail(note?._id)}
                >

                    {/* Image at top */}
                    <div className="h-24">
                        <img
                            src={note.image || DefaultImage} // fallback if no image
                            onError={(e) => {
                                e.currentTarget.src = DefaultImage;
                            }}
                            className="pt-2"
                            width={100}
                        />
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