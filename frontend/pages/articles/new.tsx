import PrivateOutlet from '@/components/PrivateOutlet/PrivateOutlet';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@/screens/Editor'), { ssr: false });

export default function New() {
    return (
        <PrivateOutlet>
            <Editor />
        </PrivateOutlet>
    );
}
