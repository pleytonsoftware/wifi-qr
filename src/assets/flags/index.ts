import type { AVAILABLE_LANGUAGE_CODES, DISABLED_LANGUAGE_CODES, LANGUAGE_CODES } from '@const/languages'
import type { ImageProps } from 'next/image'

import arab from './arab.svg'
import bg from './bg.svg'
import cn from './cn.svg'
import cz from './cz.svg'
import de from './de.svg'
import dk from './dk.svg'
import ee from './ee.svg'
import esCt from './es-ct.svg'
import esGa from './es-ga.svg'
import esPv from './es-pv.svg'
import es from './es.svg'
import fi from './fi.svg'
import fr from './fr.svg'
import gb from './gb.svg'
import gr from './gr.svg'
import hr from './hr.svg'
import hu from './hu.svg'
import id from './id.svg'
import il from './il.svg'
import inFlag from './in.svg'
import it from './it.svg'
import jp from './jp.svg'
import kr from './kr.svg'
import lt from './lt.svg'
import lv from './lv.svg'
import my from './my.svg'
import nl from './nl.svg'
import no from './no.svg'
import pl from './pl.svg'
import pt from './pt.svg'
import ro from './ro.svg'
import rs from './rs.svg'
import ru from './ru.svg'
import se from './se.svg'
import si from './si.svg'
import sk from './sk.svg'
import th from './th.svg'
import tr from './tr.svg'
import ua from './ua.svg'
import vn from './vn.svg'

export const AVAILABLE_LANGUAGE_FLAGS_DICTIONARY: Record<AVAILABLE_LANGUAGE_CODES, ImageProps> = {
	en: gb,
	de: de,
	fr: fr,
	es: es,
	it: it,
	pt: pt,
	ca: esCt,
	eu: esPv,
	gl: esGa,
	ar: arab, // Using 'arab' for Arabic flag
}
export const DISABLED_LANGUAGE_FLAGS_DICTIONARY: Record<DISABLED_LANGUAGE_CODES, ImageProps> = {
	nl: nl,
	pl: pl,
	ru: ru,
	zh: cn, // Using 'cn' for Chinese flag
	ja: jp, // Using 'jp' for Japanese flag
	ko: kr, // Using 'kr' for Korean flag
	hi: inFlag, // Using 'inFlag' for Indian flag
	tr: tr,
	vi: vn, // Using 'vn' for Vietnamese flag
	id: id,
	th: th,
	ms: my, // Using 'my' for Malay flag
	cs: cz,
	hu: hu,
	ro: ro,
	sk: sk,
	bg: bg,
	hr: hr,
	sr: rs, // Using 'rs' for Serbian flag
	uk: ua, // Using 'ua' for Ukrainian flag
	el: gr, // Using 'gr' for Greek flag
	fi: fi,
	no: no,
	da: dk, // Using 'dk' for Danish flag
	sv: se, // Using 'se' for Swedish flag
	lt: lt,
	sl: si, // Using 'si' for Slovenian flag
	et: ee, // Using 'ee' for Estonian flag
	lv: lv, // Using 'lv' for Latvian flag
	he: il,
}

export const ALL_LANGUAGE_FLAGS_DICTIONARY: Record<LANGUAGE_CODES, ImageProps> = {
	...AVAILABLE_LANGUAGE_FLAGS_DICTIONARY,
	...DISABLED_LANGUAGE_FLAGS_DICTIONARY,
}
