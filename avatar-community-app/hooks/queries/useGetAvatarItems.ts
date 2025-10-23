import { useQueries } from "@tanstack/react-query";

import {
  getBottoms,
  getFaces,
  getHands,
  getHats,
  getSkins,
  getTops,
} from "@/api/avatar";
import { queryKeys } from "@/constants";

export function useGetAvatarItems() {
  const [
    hatsQuery,
    facesQuery,
    topsQuery,
    bottomsQuery,
    handsQuery,
    skinsQuery,
  ] = useQueries({
    queries: [
      {
        queryFn: getHats,
        queryKey: [queryKeys.AVATAR, queryKeys.HATS],
      },
      {
        queryFn: getFaces,
        queryKey: [queryKeys.AVATAR, queryKeys.FACES],
      },
      {
        queryFn: getTops,
        queryKey: [queryKeys.AVATAR, queryKeys.TOPS],
      },
      {
        queryFn: getBottoms,
        queryKey: [queryKeys.AVATAR, queryKeys.BOTTOM],
      },
      {
        queryFn: getHands,
        queryKey: [queryKeys.AVATAR, queryKeys.HANDS],
      },
      {
        queryFn: getSkins,
        queryKey: [queryKeys.AVATAR, queryKeys.SKIN],
      },
    ],
  });

  return {
    hats: hatsQuery.data || [],
    faces: facesQuery.data || [],
    tops: topsQuery.data || [],
    bottoms: bottomsQuery.data || [],
    hands: handsQuery.data || [],
    skins: skinsQuery.data || [],
  };
}
