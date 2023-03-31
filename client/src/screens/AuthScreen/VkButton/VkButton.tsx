import { Config, Connect, ConnectEvents } from '@vkontakte/superappkit';

Config.init({
    appId: parseInt(process.env.NEXT_PUBLIC_VK_APP_ID ?? '', 10), // идентификатор приложения
});

const VkButton: React.FC = () => {
    buttonOneTap?.getFrame();

    return <div>VkButton</div>;
};

export default VkButton;

var buttonOneTap = Connect.buttonOneTapAuth({
    callback: function (evt) {
        const type = evt.type;
        if (!type) {
            return;
        }

        switch (type) {
            case ConnectEvents.OneTapAuthEventsSDK.LOGIN_SUCCESS:
            // return onAuthUser(evt);
            // Для событий PHONE_VALIDATION_NEEDED и FULL_AUTH_NEEDED нужно открыть полноценный VK ID, чтобы пользователь дорегистрировался или валидировал телефон
            case ConnectEvents.OneTapAuthEventsSDK.FULL_AUTH_NEEDED:
            case ConnectEvents.OneTapAuthEventsSDK.PHONE_VALIDATION_NEEDED:
            case ConnectEvents.ButtonOneTapAuthEventsSDK.SHOW_LOGIN:
                return Connect.redirectAuth({ url: 'https://...', state: 'dj29fnsadjsd82...' });
            case ConnectEvents.ButtonOneTapAuthEventsSDK.SHOW_LOGIN_OPTIONS:
            // Параметр screen: phone позволяет сразу открыть окно ввода телефона в VK ID
            // return Connect.redirectAuth({ url: string, state: string, screen: 'phone' });
        }
        return;
    },
    options: {
        showAlternativeLogin: true, // отображает кнопку входа другим способом
        showAgreements: false, // в значении true отображает окно политик конфиденциальности в том случае, если пользователь еще не принимал политики
        showAgreementsDialog: true, // отображает диалоговое окно принятия политик
        displayMode: 'default', // отображает данных пользователя, возможные значения: default — только имя, name_phone — имя и телефон, phone_name — телефон и имя
    },
});
