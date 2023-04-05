import { EditorPageMode } from '@/lib/enums';
import EditorScreen from '@/screens/EditorScreen/EditorScreen';
import PrivateOutlet from '@/components/outlets/PrivateOutlet/PrivateOutlet';

export default function EditorPageNew() {
    return (
        <PrivateOutlet>
            <EditorScreen mode={EditorPageMode.EDIT} />
        </PrivateOutlet>
    );
}
