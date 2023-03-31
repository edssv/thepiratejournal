import dynamic from 'next/dynamic';

import { EditorPageMode } from '@/lib/enums';
import PrivateOutlet from '@/components/outlets/PrivateOutlet/PrivateOutlet';
import ClientOnly from '@/components/ClientOnly/ClientOnly';
import EditorScreen from '@/screens/EditorScreen/EditorScreen';

export default function EditorPageNew() {
    return (
        <PrivateOutlet>
            <EditorScreen mode={EditorPageMode.NEW} />
        </PrivateOutlet>
    );
}
