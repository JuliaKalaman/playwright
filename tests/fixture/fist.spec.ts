import { loggedPageTest as test } from "../../fixtures/loggedPage";

test('log user info', async ({ userGaragePage }) => {
    await userGaragePage.goto('/')
    await userGaragePage.pause()
})

