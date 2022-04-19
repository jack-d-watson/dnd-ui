import { gql } from "@apollo/client";

export function getSpellByIndex(monsterIndex: string) {
    return gql`
    query {
        spell(filter: { index: "${monsterIndex}"}) {
          area_of_effect {
            size
            type
          }
          attack_type
          casting_time
          classes {
            index
            name
          }
          components
          concentration
          damage {
            damage_at_slot_level
            damage_at_character_level
            damage_type {
              index
              name
            }
          }
          dc {
            dc_success
            dc_type {
              name
              index
            }
            desc
          }
          desc
          duration
          heal_at_slot_level
          higher_level
          index
          level
          material
          name
          range
          ritual
          school {
            desc
            index
            name
          }
          subclasses {
            index
            name
          }
          url
        }
      }
    `
}