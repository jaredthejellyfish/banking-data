create table "public"."user_tokens" (
    "user_id" uuid,
    "token" text not null,
    "expires" timestamp with time zone,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone not null default timezone('utc'::text, now())
);


alter table "public"."user_tokens" enable row level security;

alter table "public"."user_tokens" add constraint "user_tokens_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."user_tokens" validate constraint "user_tokens_user_id_fkey";

grant delete on table "public"."user_tokens" to "anon";

grant insert on table "public"."user_tokens" to "anon";

grant references on table "public"."user_tokens" to "anon";

grant select on table "public"."user_tokens" to "anon";

grant trigger on table "public"."user_tokens" to "anon";

grant truncate on table "public"."user_tokens" to "anon";

grant update on table "public"."user_tokens" to "anon";

grant delete on table "public"."user_tokens" to "authenticated";

grant insert on table "public"."user_tokens" to "authenticated";

grant references on table "public"."user_tokens" to "authenticated";

grant select on table "public"."user_tokens" to "authenticated";

grant trigger on table "public"."user_tokens" to "authenticated";

grant truncate on table "public"."user_tokens" to "authenticated";

grant update on table "public"."user_tokens" to "authenticated";

grant delete on table "public"."user_tokens" to "service_role";

grant insert on table "public"."user_tokens" to "service_role";

grant references on table "public"."user_tokens" to "service_role";

grant select on table "public"."user_tokens" to "service_role";

grant trigger on table "public"."user_tokens" to "service_role";

grant truncate on table "public"."user_tokens" to "service_role";

grant update on table "public"."user_tokens" to "service_role";

create policy "Allow users to access their tokens"
on "public"."user_tokens"
as permissive
for select
to public
using ((auth.uid() = user_id));


create policy "Allow users to insert tokens"
on "public"."user_tokens"
as permissive
for insert
to public
with check ((auth.uid() = user_id));



