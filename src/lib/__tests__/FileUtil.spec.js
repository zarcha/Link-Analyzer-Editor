import { vi, expect, it, describe, afterAll } from 'vitest';
import FileUtil from '../FileUtil.js';

const obj = {
    petId: 2555,
    owner: 0,
    naviId: 4,
    level: 255,
    experiance: 0,
    health: 250,
    attack: 1,
    wins: 0,
    losses: 0,
    unknownSprite:
        'F8FC510F10139F1F7E3C1A1D636A953E84F42F3F0F18B03E1AFE5F3FD55F6A3E3AB8BF3EF0E0711FE063EF32C0FFEB32607FE333F0CCF723F8B3FF0F047FAF3EA8B35F0FD04CB723603FE333C55FEF3382A3EB32E0E0711F30B8BF3EE1576A3F2AFE5F3E1D15303D87EAAF3E6041111F1FE0981FF071560F',
    crossSprite:
        '0000C014000000330078001D00900029007E0F3580337D3900EE9A35C051F5398028E01BE0C53F0F10FCDF0748F8BF2F3CF01F0F20705E2F108C7E1F089D8E2F84EABE3F1ED4C71F08E857140494FF14028AC7330701331F88808E0F3C00FD272080CA171040A1131000B00BC801AD2BB8CC0329C82B0125',
    loseSprite:
        '0080070000F00B0000201500FC70380003DF340F001AE8383F34F41568BCEA39BF7CF535CCF8FA3B70D8FD3500F09F3A00B0FA1700207D24555597388A2AA50500B4972900F8553D70DC3739CCFA3D3DBFFCB929E8FEF1147F75A93BA8DAD33D034FAF3FFCC4FE3F00ACF53F80C72B0000A11F00005E0700',
    winSprite:
        'FCD7FF1FDCAFFF3FACD7FF3F54A7FF3F84D6FF3F3887D53F900FAF3FE0F3713FC11FC03E7B70003F0FC0033A862A071651C5013BA9F0873D0638FC3F0B34B43F1B12963F2816D23F2F178B3F3E994A3F3DD78B3E001E481501FDA92A80045F1500ADEE2A80543D1540AD9E2B807E4D3F40FEA73F20FFF13F',
    raw: '040009FB0000000000FF000019010000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF130025412424444535401229380010121439161F450000000000000000000000000000000000000000000000000000000000000000000000000000000000000005001131442938FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF0A0A1400F0003800E0024C03AB025501F602CB03BC02E801FFFFFFFFFFFFFFFF1E1E7800F8FC510F10139F1F7E3C1A1D636A953E84F42F3F0F18B03E1AFE5F3FD55F6A3E3AB8BF3EF0E0711FE063EF32C0FFEB32607FE333F0CCF723F8B3FF0F047FAF3EA8B35F0FD04CB723603FE333C55FEF3382A3EB32E0E0711F30B8BF3EE1576A3F2AFE5F3E1D15303D87EAAF3E6041111F1FE0981FF071560FFFFFFFFF1E1E78000000C014000000330078001D00900029007E0F3580337D3900EE9A35C051F5398028E01BE0C53F0F10FCDF0748F8BF2F3CF01F0F20705E2F108C7E1F089D8E2F84EABE3F1ED4C71F08E857140494FF14028AC7330701331F88808E0F3C00FD272080CA171040A1131000B00BC801AD2BB8CC0329C82B0125FFFFFFFF1E1E78000080070000F00B0000201500FC70380003DF340F001AE8383F34F41568BCEA39BF7CF535CCF8FA3B70D8FD3500F09F3A00B0FA1700207D24555597388A2AA50500B4972900F8553D70DC3739CCFA3D3DBFFCB929E8FEF1147F75A93BA8DAD33D034FAF3FFCC4FE3F00ACF53F80C72B0000A11F00005E0700FFFFFFFF1E1E7800FCD7FF1FDCAFFF3FACD7FF3F54A7FF3F84D6FF3F3887D53F900FAF3FE0F3713FC11FC03E7B70003F0FC0033A862A071651C5013BA9F0873D0638FC3F0B34B43F1B12963F2816D23F2F178B3F3E994A3F3DD78B3E001E481501FDA92A80045F1500ADEE2A80543D1540AD9E2B807E4D3F40FEA73F20FFF13FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
};

describe('Test File Utilities', () => {
    afterAll(() => {
        vi.clearAllMocks();
    });

    it('Save Navi', () => {
        Object.defineProperty(window, 'showSaveFilePicker', {
            value: vi.fn().mockResolvedValue({
                name: 'backup.navi',
                createWritable: vi.fn().mockResolvedValue({
                    write: vi.fn().mockResolvedValue(),
                    close: vi.fn().mockResolvedValue(),
                }),
            }),
            configurable: true,
        });

        FileUtil.saveNavi(obj).then((fileName) => {
            expect(fileName).toBe('backup.navi');
        });
    });
});
