import { CarouselHome } from "@/components/home/Carousel";
import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import { ProjectsCard } from "@/components/projects/ProjectsCard";
import { Button } from "@/components/ui/button";
import { getAllProjects } from "@/functions/projects";
import { getAllTestimonials } from "@/functions/testimonials";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const testimonials = await getAllTestimonials();

  console.log(testimonials);
  const disponibleProjects = await getAllProjects(
    { st_disponibility: true },
    0,
    3
  );
  const undisponibleProjects = await getAllProjects(
    { st_disponibility: false },
    0,
    3
  );

  return (
    <>
      <header
        style={{
          background: "url(/images/background/bg-1.png) no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
        className="py-10"
      >
        <Navbar />
        <div className="container my-[80px] xl:my-[170px]">
          <div className="flex flex-col items-start justify-center text-left">
            <div className="xl:-ml-10 max-w-[250px] md:max-w-full">
              <Image
                src="/images/assets/title.png"
                width={471}
                height={234}
                alt="Titulo"
              />
            </div>
            <p className="mt-10 mb-3 text-xs lg:text-sm font-bold uppercase text-white">
              Construção Civil - Incorporação Imobiliária
            </p>
            <p className="text-md lg:text-xl text-white max-w-[310px] mb-5">
              A chave dos seus sonhos está te esperando!
            </p>
            <Link href="/whatsapp" target="_blank">
              <div className="block lg:hidden">
                <Button className="text-sm px-[30px] py-[15px] h-[45px]  rounded-sm bg-theme-500">
                  Contate-nos
                </Button>
              </div>
              <div className="hidden lg:block">
                <Button
                  className="text-2xl px-[30px] py-[15px] h-[45px]  rounded-sm bg-theme-500"
                  size="lg"
                >
                  Contate-nos
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className="container flex justify-between items-center mt-[72px] lg:mt-[221px] mb-[144px] lg:mb-[263px] gap-16 flex-col lg:flex-row">
          <div className="block lg:hidden w-full text-left">
            <div className="text-left">
              <h3 className="font-semibold text-sm text-theme-800">
                BEM VINDOS À NOSSA EMPRESA
              </h3>
              <h1 className="font-bold text-[28px] text-theme-500">
                CONHEÇA A<br /> FEER CONSTRUTORA
              </h1>
            </div>
          </div>
          <div className="w-full max-w-[600px]">
            <Image
              src="/images/assets/meet.png"
              width={640}
              height={642}
              alt="Conheça a Feer Construtora"
            />
          </div>
          <div className="w-fit">
            <div className="hidden lg:block">
              <div>
                <h3 className="font-semibold text-theme-800">
                  BEM VINDOS À NOSSA EMPRESA
                </h3>
                <h1 className="font-bold text-5xl text-theme-400">
                  CONHEÇA A<br /> FEER CONSTRUTORA
                </h1>
              </div>
            </div>
            <p className="mt-4 lg:mt-12 text-theme-600 lg:text-justify">
              A FEER Construtora, fundada em 2013 na região serrana do Rio de
              Janeiro, iniciou no mercado de manutenção e reformas de
              supermercados, expandindo rapidamente devido à qualidade de seus
              serviços. Ao consolidar-se na construção civil, a empresa
              direcionou-se para a incorporação imobiliária, conquistando
              empreendimentos notáveis, como o Edifício Mª Nancy Monnerat
              Erthal. Atualmente, nós da FEER focamos na construção de
              residências e condomínios de alto padrão em Bom Jardim, RJ, uma
              cidade marcada por suas áreas verdes e clima ameno, que oferece um
              ambiente encantador para quem busca tranquilidade e conexão com a
              natureza. Nesse contexto, a empresa destaca-se como impulsionadora
              da qualidade construtiva, contribuindo para o desenvolvimento do
              mercado local e consolidando sua posição como referência de
              excelência no setor imobiliário.
            </p>
          </div>
        </section>
        {!!testimonials.data && testimonials.data.length > 0 && (
          <section className="container mb-[113px] lg:mb-[299px]">
            <div className="flex flex-col w-full lg:text-center items-start text-start lg:items-center lg:justify-center mb-[93px]">
              <h3 className="font-semibold text-theme-800">DEPOIMENTOS</h3>
              <h1 className="font-bold text-3xl lg:text-5xl text-theme-400">
                O QUE NOSSOS <br /> CLIENTES DIZEM
              </h1>
            </div>
            <div className="block lg:hidden">
              <CarouselHome testimonials={testimonials.data || []} />
            </div>
            <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 hidden lg:grid">
              {!!testimonials.data[0] && (
                <div className="flex items-center justify-center flex-col text-center aspect-square">
                  <svg
                    width="71"
                    height="49"
                    viewBox="0 0 71 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.2316 48.88L2.05156 41.68C5.89156 37.72 8.53156 34.06 9.97156 30.7C11.5316 27.22 12.3116 23.62 12.3116 19.9L17.8916 24.94H0.251563V0.0999923H25.4516V16.48C25.4516 22.6 24.3716 28.24 22.2116 33.4C20.1716 38.44 16.5116 43.6 11.2316 48.88ZM55.88 48.88L46.7 41.68C50.54 37.72 53.18 34.06 54.62 30.7C56.18 27.22 56.96 23.62 56.96 19.9L62.54 24.94H44.9V0.0999923H70.1V16.48C70.1 22.6 69.02 28.24 66.86 33.4C64.82 38.44 61.16 43.6 55.88 48.88Z"
                      fill="#C83538"
                    />
                  </svg>
                  <p className="max-w-[350px] w-full mt-10 text-sm lg:text-xl text-theme-600">
                    {testimonials.data[0].testimonial}
                  </p>
                  <h3 className="text-lg font-bold text-theme-600 mt-6">
                    {testimonials.data[0].nm_person}
                  </h3>
                </div>
              )}
              {testimonials.data[1] && (
                <div>
                  <div className="flex items-center justify-center flex-col text-center p-10 bg-theme-500 aspect-square">
                    <svg
                      width="78"
                      height="55"
                      viewBox="0 0 78 55"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.5906 54.2L2.39063 46.2C6.65729 41.8 9.59063 37.7333 11.1906 34C12.924 30.1333 13.7906 26.1333 13.7906 22L19.9906 27.6H0.390626V-8.58307e-06H28.3906V18.2C28.3906 25 27.1906 31.2667 24.7906 37C22.524 42.6 18.4573 48.3333 12.5906 54.2ZM62.2 54.2L52 46.2C56.2667 41.8 59.2 37.7333 60.8 34C62.5333 30.1333 63.4 26.1333 63.4 22L69.6 27.6H50V-8.58307e-06H78V18.2C78 25 76.8 31.2667 74.4 37C72.1333 42.6 68.0667 48.3333 62.2 54.2Z"
                        fill="white"
                      />
                    </svg>

                    <p className="max-w-[350px] w-full mt-10 text-sm lg:text-xl text-white">
                      {testimonials.data[1].testimonial}
                    </p>
                    <h3 className="text-lg font-bold text-white mt-6">
                      {testimonials.data[1].nm_person}
                    </h3>
                  </div>
                  <div className="bg-theme-500 w-[91.5px] h-[63px] ml-[48px] clipy" />
                </div>
              )}
              {!!testimonials.data[2] && (
                <div className="flex items-center justify-center flex-col text-center aspect-square">
                  <svg
                    width="71"
                    height="49"
                    viewBox="0 0 71 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.2316 48.88L2.05156 41.68C5.89156 37.72 8.53156 34.06 9.97156 30.7C11.5316 27.22 12.3116 23.62 12.3116 19.9L17.8916 24.94H0.251563V0.0999923H25.4516V16.48C25.4516 22.6 24.3716 28.24 22.2116 33.4C20.1716 38.44 16.5116 43.6 11.2316 48.88ZM55.88 48.88L46.7 41.68C50.54 37.72 53.18 34.06 54.62 30.7C56.18 27.22 56.96 23.62 56.96 19.9L62.54 24.94H44.9V0.0999923H70.1V16.48C70.1 22.6 69.02 28.24 66.86 33.4C64.82 38.44 61.16 43.6 55.88 48.88Z"
                      fill="#C83538"
                    />
                  </svg>
                  <p className="max-w-[350px] w-full mt-10 text-xl text-theme-600">
                    {testimonials.data[2].testimonial}
                  </p>
                  <h3 className="text-sm lg:text-xl font-bold text-theme-600 mt-6">
                    {testimonials.data[2].nm_person}
                  </h3>
                </div>
              )}
            </div>
          </section>
        )}
        <div className="lg:hidden w-gull">
          <Image
            src="/images/assets/why.png"
            width={1000}
            height={350}
            alt="Diferenciais da Feers"
          />
          <div className="container text-3xl font-bold text-theme-500 uppercase w-full mt-10">
            <h1>Por que escolher a Feer?</h1>
          </div>
        </div>
        <section className="mb-[166px] container flex flex-col lg:flex-row gap-10 lg:gap-0 items-center justify-between mt-10">
          <div className="max-lg:hidden">
            <Image
              src="/images/assets/diferentials.png"
              width={631}
              height={719}
              alt="Diferenciais da Feers"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[79px]">
            <div className="text-center flex flex-col items-center justify-center max-w-[313px] w-full">
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_40_14"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="50"
                  height="50"
                >
                  <rect width="50" height="50" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_40_14)">
                  <path
                    d="M0 36.7188V33.4375C0 31.9444 0.763889 30.7292 2.29167 29.7917C3.81944 28.8542 5.83333 28.3854 8.33333 28.3854C8.78472 28.3854 9.21875 28.3941 9.63542 28.4115C10.0521 28.4288 10.4514 28.4722 10.8333 28.5417C10.3472 29.2708 9.98264 30.0347 9.73958 30.8333C9.49653 31.6319 9.375 32.4653 9.375 33.3333V36.7188H0ZM12.5 36.7188V33.3333C12.5 32.2222 12.8038 31.2066 13.4115 30.2865C14.0191 29.3663 14.8785 28.559 15.9896 27.8646C17.1007 27.1701 18.4288 26.6493 19.974 26.3021C21.5191 25.9549 23.1944 25.7812 25 25.7812C26.8403 25.7812 28.533 25.9549 30.0781 26.3021C31.6233 26.6493 32.9514 27.1701 34.0625 27.8646C35.1736 28.559 36.0243 29.3663 36.6146 30.2865C37.2049 31.2066 37.5 32.2222 37.5 33.3333V36.7188H12.5ZM40.625 36.7188V33.3333C40.625 32.4306 40.5121 31.5799 40.2865 30.7812C40.0608 29.9826 39.7222 29.2361 39.2708 28.5417C39.6528 28.4722 40.0434 28.4288 40.4427 28.4115C40.842 28.3941 41.25 28.3854 41.6667 28.3854C44.1667 28.3854 46.1806 28.8455 47.7083 29.7656C49.2361 30.6858 50 31.9097 50 33.4375V36.7188H40.625ZM16.9271 32.5521H33.125C32.7778 31.8576 31.8142 31.25 30.2344 30.7292C28.6545 30.2083 26.9097 29.9479 25 29.9479C23.0903 29.9479 21.3455 30.2083 19.7656 30.7292C18.1858 31.25 17.2396 31.8576 16.9271 32.5521ZM8.33333 26.3021C7.1875 26.3021 6.2066 25.8941 5.39062 25.0781C4.57465 24.2622 4.16667 23.2812 4.16667 22.1354C4.16667 20.9549 4.57465 19.9653 5.39062 19.1667C6.2066 18.3681 7.1875 17.9688 8.33333 17.9688C9.51389 17.9688 10.5035 18.3681 11.3021 19.1667C12.1007 19.9653 12.5 20.9549 12.5 22.1354C12.5 23.2812 12.1007 24.2622 11.3021 25.0781C10.5035 25.8941 9.51389 26.3021 8.33333 26.3021ZM41.6667 26.3021C40.5208 26.3021 39.5399 25.8941 38.724 25.0781C37.908 24.2622 37.5 23.2812 37.5 22.1354C37.5 20.9549 37.908 19.9653 38.724 19.1667C39.5399 18.3681 40.5208 17.9688 41.6667 17.9688C42.8472 17.9688 43.8368 18.3681 44.6354 19.1667C45.434 19.9653 45.8333 20.9549 45.8333 22.1354C45.8333 23.2812 45.434 24.2622 44.6354 25.0781C43.8368 25.8941 42.8472 26.3021 41.6667 26.3021ZM25 24.2188C23.2639 24.2188 21.7882 23.6111 20.5729 22.3958C19.3576 21.1806 18.75 19.7049 18.75 17.9688C18.75 16.1979 19.3576 14.7135 20.5729 13.5156C21.7882 12.3177 23.2639 11.7188 25 11.7188C26.7708 11.7188 28.2552 12.3177 29.4531 13.5156C30.651 14.7135 31.25 16.1979 31.25 17.9688C31.25 19.7049 30.651 21.1806 29.4531 22.3958C28.2552 23.6111 26.7708 24.2188 25 24.2188ZM25 20.0521C25.5903 20.0521 26.0851 19.8524 26.4844 19.4531C26.8837 19.0538 27.0833 18.559 27.0833 17.9688C27.0833 17.3785 26.8837 16.8837 26.4844 16.4844C26.0851 16.0851 25.5903 15.8854 25 15.8854C24.4097 15.8854 23.9149 16.0851 23.5156 16.4844C23.1163 16.8837 22.9167 17.3785 22.9167 17.9688C22.9167 18.559 23.1163 19.0538 23.5156 19.4531C23.9149 19.8524 24.4097 20.0521 25 20.0521Z"
                    fill="#C83538"
                  />
                </g>
              </svg>
              <h1 className="font-semibold text-xl text-theme-800 my-3 max-lg:text-lg">
                Equipe experiente
              </h1>
              <p className="text-xl text-theme-700 max-lg:text-lg">
                Equipe talentosa e experiente, garantindo excelência e
                eficiência em cada projeto
              </p>
            </div>
            <div className="text-center flex flex-col items-center justify-center max-w-[313px] w-full">
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_40_20"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="50"
                  height="50"
                >
                  <rect width="50" height="50" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_40_20)">
                  <path
                    d="M21.875 31.2498H28.125L26.9271 24.5311C27.6216 24.1839 28.1684 23.6804 28.5678 23.0207C28.9671 22.361 29.1667 21.6318 29.1667 20.8332C29.1667 19.6873 28.7587 18.7064 27.9428 17.8905C27.1268 17.0745 26.1459 16.6665 25 16.6665C23.8542 16.6665 22.8733 17.0745 22.0573 17.8905C21.2414 18.7064 20.8334 19.6873 20.8334 20.8332C20.8334 21.6318 21.033 22.361 21.4323 23.0207C21.8316 23.6804 22.3785 24.1839 23.073 24.5311L21.875 31.2498ZM25 45.8332C20.1737 44.6179 16.1893 41.8488 13.0469 37.5259C9.90455 33.203 8.33337 28.4026 8.33337 23.1248V10.4165L25 4.1665L41.6667 10.4165V23.1248C41.6667 28.4026 40.0955 33.203 36.9532 37.5259C33.8108 41.8488 29.8264 44.6179 25 45.8332ZM25 41.4582C28.6112 40.3123 31.5973 38.0207 33.9584 34.5832C36.3195 31.1457 37.5 27.3262 37.5 23.1248V13.2811L25 8.59359L12.5 13.2811V23.1248C12.5 27.3262 13.6806 31.1457 16.0417 34.5832C18.4028 38.0207 21.3889 40.3123 25 41.4582Z"
                    fill="#C83538"
                  />
                </g>
              </svg>

              <h1 className="font-semibold text-xl text-theme-800 my-3">
                Qualidade garantida
              </h1>
              <p className="text-xl text-theme-700">
                Padrões impecáveis garantem a excelência em todos os nossos
                projetos.
              </p>
            </div>
            <div className="text-center flex flex-col items-center justify-center max-w-[313px] w-full">
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_40_8"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="50"
                  height="50"
                >
                  <rect width="50" height="50" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_40_8)">
                  <path
                    d="M19.7917 43.75V27.1354C17.5694 27.1354 15.434 26.7101 13.3854 25.8594C11.3368 25.0087 9.53125 23.8021 7.96875 22.2396C6.40625 20.6771 5.20833 18.8715 4.375 16.8229C3.54167 14.7743 3.125 12.6389 3.125 10.4167V6.25H7.29167C9.47917 6.25 11.5972 6.67535 13.6458 7.52604C15.6944 8.37674 17.5 9.58333 19.0625 11.1458C20.1389 12.2222 21.033 13.4028 21.7448 14.6875C22.4566 15.9722 23.0035 17.3438 23.3854 18.8021C23.559 18.559 23.75 18.3247 23.9583 18.099C24.1667 17.8733 24.3924 17.6389 24.6354 17.3958C26.1979 15.8333 28.0035 14.6267 30.0521 13.776C32.1007 12.9253 34.2361 12.5 36.4583 12.5H40.625V16.6667C40.625 18.8889 40.1997 21.0243 39.349 23.0729C38.4983 25.1215 37.2917 26.9271 35.7292 28.4896C34.1667 30.0521 32.3698 31.25 30.3385 32.0833C28.3073 32.9167 26.1806 33.3333 23.9583 33.3333V43.75H19.7917ZM19.7917 22.9167C19.7917 21.25 19.4705 19.6615 18.8281 18.151C18.1858 16.6406 17.2743 15.2951 16.0937 14.1146C14.9132 12.934 13.5677 12.0226 12.0573 11.3802C10.5469 10.7378 8.95833 10.4167 7.29167 10.4167C7.29167 12.0833 7.60417 13.6806 8.22917 15.2083C8.85417 16.7361 9.75694 18.0903 10.9375 19.2708C12.1181 20.4514 13.4722 21.3542 15 21.9792C16.5278 22.6042 18.125 22.9167 19.7917 22.9167ZM23.9583 29.1667C25.625 29.1667 27.2135 28.8542 28.724 28.2292C30.2344 27.6042 31.5799 26.7014 32.7604 25.5208C33.941 24.3403 34.8524 22.9861 35.4948 21.4583C36.1372 19.9306 36.4583 18.3333 36.4583 16.6667C34.7917 16.6667 33.1944 16.9878 31.6667 17.6302C30.1389 18.2726 28.7847 19.184 27.6042 20.3646C26.4236 21.5451 25.5208 22.8906 24.8958 24.401C24.2708 25.9115 23.9583 27.5 23.9583 29.1667Z"
                    fill="#C83538"
                  />
                </g>
              </svg>

              <h1 className="font-semibold text-xl text-theme-800 my-3">
                Compromisso ambiental
              </h1>
              <p className="text-xl text-theme-700">
                Nosso foco sustentável minimiza impactos através de práticas
                construtivas responsáveis
              </p>
            </div>
            <div className="text-center flex flex-col items-center justify-center max-w-[313px] w-full">
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_40_26"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="50"
                  height="50"
                >
                  <rect width="50" height="50" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_40_26)">
                  <path
                    d="M24.7396 41.6667C24.8785 41.6667 25.0174 41.632 25.1562 41.5626C25.2951 41.4931 25.3993 41.4237 25.4687 41.3542L42.5521 24.2709C42.9688 23.8542 43.2726 23.3855 43.4635 22.8647C43.6545 22.3438 43.75 21.823 43.75 21.3022C43.75 20.7466 43.6545 20.2171 43.4635 19.7136C43.2726 19.2102 42.9688 18.7674 42.5521 18.3855L33.6979 9.53133C33.316 9.11466 32.8733 8.81085 32.3698 8.61987C31.8663 8.4289 31.3368 8.33341 30.7812 8.33341C30.2604 8.33341 29.7396 8.4289 29.2188 8.61987C28.6979 8.81085 28.2292 9.11466 27.8125 9.53133L27.2396 10.1042L31.0938 14.0105C31.6146 14.4966 31.9965 15.0522 32.2396 15.6772C32.4826 16.3022 32.6042 16.9619 32.6042 17.6563C32.6042 19.1147 32.1094 20.3386 31.1198 21.3282C30.1302 22.3178 28.9062 22.8126 27.4479 22.8126C26.7535 22.8126 26.0851 22.6911 25.4427 22.448C24.8003 22.2049 24.2361 21.8404 23.75 21.3542L19.8437 17.5001L10.7292 26.6147C10.625 26.7188 10.5469 26.8317 10.4948 26.9532C10.4427 27.0747 10.4167 27.2049 10.4167 27.3438C10.4167 27.6216 10.5208 27.8733 10.7292 28.099C10.9375 28.3247 11.1806 28.4376 11.4583 28.4376C11.5972 28.4376 11.7361 28.4029 11.875 28.3334C12.0139 28.264 12.1181 28.1945 12.1875 28.1251L19.2708 21.0417L22.1875 23.9584L15.1562 31.0417C15.0521 31.1459 14.974 31.2588 14.9219 31.3803C14.8698 31.5018 14.8437 31.632 14.8437 31.7709C14.8437 32.0487 14.9479 32.2917 15.1562 32.5001C15.3646 32.7084 15.6076 32.8126 15.8854 32.8126C16.0243 32.8126 16.1632 32.7779 16.3021 32.7084C16.441 32.639 16.5451 32.5695 16.6146 32.5001L23.6979 25.4688L26.6146 28.3855L19.5833 35.4688C19.4792 35.5383 19.401 35.6424 19.349 35.7813C19.2969 35.9202 19.2708 36.0591 19.2708 36.198C19.2708 36.4758 19.375 36.7188 19.5833 36.9272C19.7917 37.1355 20.0347 37.2397 20.3125 37.2397C20.4514 37.2397 20.5816 37.2136 20.7031 37.1615C20.8247 37.1095 20.9375 37.0313 21.0417 36.9272L28.125 29.8959L31.0417 32.8126L23.9583 39.8959C23.8542 40.0001 23.776 40.1129 23.724 40.2345C23.6719 40.356 23.6458 40.4862 23.6458 40.6251C23.6458 40.9029 23.7587 41.1459 23.9844 41.3542C24.2101 41.5626 24.4618 41.6667 24.7396 41.6667ZM24.6875 45.8334C23.4028 45.8334 22.2656 45.4081 21.276 44.5574C20.2865 43.7067 19.7049 42.639 19.5312 41.3542C18.3507 41.1806 17.3611 40.6945 16.5625 39.8959C15.7639 39.0973 15.2778 38.1077 15.1042 36.9272C13.9236 36.7536 12.9427 36.2588 12.1615 35.4428C11.3802 34.6268 10.9028 33.6459 10.7292 32.5001C9.40972 32.3265 8.33333 31.7536 7.5 30.7813C6.66667 29.8091 6.25 28.6633 6.25 27.3438C6.25 26.6494 6.38021 25.981 6.64062 25.3386C6.90104 24.6963 7.27431 24.132 7.76042 23.6459L19.8437 11.6147L26.6667 18.4376C26.7361 18.5417 26.8403 18.6199 26.9792 18.672C27.1181 18.724 27.2569 18.7501 27.3958 18.7501C27.7083 18.7501 27.9687 18.6546 28.1771 18.4636C28.3854 18.2727 28.4896 18.0209 28.4896 17.7084C28.4896 17.5695 28.4635 17.4306 28.4115 17.2917C28.3594 17.1529 28.2812 17.0487 28.1771 16.9792L20.7292 9.53133C20.3472 9.11466 19.9045 8.81085 19.401 8.61987C18.8976 8.4289 18.3681 8.33341 17.8125 8.33341C17.2917 8.33341 16.7708 8.4289 16.25 8.61987C15.7292 8.81085 15.2604 9.11466 14.8437 9.53133L7.5 16.9272C7.1875 17.2397 6.92708 17.6042 6.71875 18.0209C6.51042 18.4376 6.37153 18.8542 6.30208 19.2709C6.23264 19.6876 6.23264 20.1129 6.30208 20.547C6.37153 20.981 6.51042 21.389 6.71875 21.7709L3.69792 24.7917C3.10764 23.9931 2.67361 23.1164 2.39583 22.1615C2.11806 21.2067 2.01389 20.2431 2.08333 19.2709C2.15278 18.2987 2.39583 17.3525 2.8125 16.4324C3.22917 15.5122 3.80208 14.6876 4.53125 13.9584L11.875 6.61466C12.7083 5.81605 13.6372 5.20841 14.6615 4.79175C15.6858 4.37508 16.7361 4.16675 17.8125 4.16675C18.8889 4.16675 19.9392 4.37508 20.9635 4.79175C21.9878 5.20841 22.8993 5.81605 23.6979 6.61466L24.2708 7.18758L24.8438 6.61466C25.6771 5.81605 26.6059 5.20841 27.6302 4.79175C28.6545 4.37508 29.7049 4.16675 30.7812 4.16675C31.8576 4.16675 32.908 4.37508 33.9323 4.79175C34.9566 5.20841 35.8681 5.81605 36.6667 6.61466L45.4688 15.4167C46.2674 16.2154 46.875 17.1355 47.2917 18.1772C47.7083 19.2188 47.9167 20.2779 47.9167 21.3542C47.9167 22.4306 47.7083 23.481 47.2917 24.5053C46.875 25.5296 46.2674 26.4411 45.4688 27.2397L28.3854 44.2709C27.8993 44.757 27.3351 45.139 26.6927 45.4167C26.0503 45.6945 25.3819 45.8334 24.6875 45.8334Z"
                    fill="#C83538"
                  />
                </g>
              </svg>

              <h1 className="font-semibold text-xl text-theme-800 my-3">
                Parcerias estratégicas
              </h1>
              <p className="text-xl text-theme-700">
                Parcerias seletas para excelência em cada detalhe de nossos
                projetos
              </p>
            </div>
          </div>
        </section>
        <section>
          <div className="mx-14 flex items-center justify-between max-lg:flex-col">
            <svg
              width="390"
              height="347"
              viewBox="0 0 390 347"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="max-lg:hidden"
            >
              <path
                d="M48.8891 25L1 31.4444V86.5556L48.8891 91M48.8891 25L97 31.4444V86.5556L48.8891 91M48.8891 25V91"
                stroke="#B6B6B6"
              />
              <path
                d="M127.889 157L80 163.444V218.556L127.889 223M127.889 157L176 163.444V218.556L127.889 223M127.889 157V223"
                stroke="#B6B6B6"
              />
              <path
                d="M89.8891 280L42 286.444V341.556L89.8891 346M89.8891 280L138 286.444V341.556L89.8891 346M89.8891 280V346"
                stroke="#B6B6B6"
              />
              <path
                d="M300.889 212L253 218.444V273.556L300.889 278M300.889 212L349 218.444V273.556L300.889 278M300.889 212V278"
                stroke="#B6B6B6"
              />
              <path
                d="M340.889 1L293 7.44444V62.5556L340.889 67M340.889 1L389 7.44444V62.5556L340.889 67M340.889 1V67"
                stroke="#B6B6B6"
              />
            </svg>
            <div className="max-w-[672px] text-center max-lg:max-w-full max-lg:w-full">
              <h3 className="uppercase text-lg text-theme-700 font-semibold max-lg:text-sm">
                Empreendimentos
              </h3>
              <h1 className="text-4xl text-theme-400 font-semibold mt-3 max-lg:text-2xl">
                Explore as oportunidades exclusivas que reservamos para você!
              </h1>
            </div>
            <svg
              width="435"
              height="373"
              viewBox="0 0 435 373"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="max-lg:hidden"
            >
              <path
                d="M69.8891 1L22 7.44444V62.5556L69.8891 67M69.8891 1L118 7.44444V62.5556L69.8891 67M69.8891 1V67"
                stroke="#B6B6B6"
              />
              <path
                d="M84.8891 210L37 216.444V271.556L84.8891 276M84.8891 210L133 216.444V271.556L84.8891 276M84.8891 210V276"
                stroke="#B6B6B6"
              />
              <path
                d="M48.8891 306L1 312.444V367.556L48.8891 372M48.8891 306L97 312.444V367.556L48.8891 372M48.8891 306V372"
                stroke="#B6B6B6"
              />
              <path
                d="M366.889 67L319 73.4444V128.556L366.889 133M366.889 67L415 73.4444V128.556L366.889 133M366.889 67V133"
                stroke="#B6B6B6"
              />
              <path
                d="M225.889 122L178 128.444V183.556L225.889 188M225.889 122L274 128.444V183.556L225.889 188M225.889 122V188"
                stroke="#B6B6B6"
              />
              <path
                d="M385.889 289L338 295.444V350.556L385.889 355M385.889 289L434 295.444V350.556L385.889 355M385.889 289V355"
                stroke="#B6B6B6"
              />
            </svg>
          </div>
          <div className="mt-20 container mb-[117px]">
            <div className="flex items-center gap-9 mb-3">
              <h1 className="text-3xl font-medium text-theme-700 max-lg:text-lg">
                Disponíveis para morar
              </h1>
              <Link
                className="text-xl font-semibold uppercase underline text-theme-500 max-lg:text-sm"
                href="/projetos/disponiveis"
              >
                Ver Tudo
              </Link>
            </div>
            {!!disponibleProjects.data && disponibleProjects.data.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[34px]">
                  {disponibleProjects.data.map((project) => {
                    return <ProjectsCard key={project.id} project={project} />;
                  })}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center text-center">
                <p>Nenhum projeto dessa categoria cadastrado.</p>
              </div>
            )}
          </div>
          <div className="mt-20 container mb-[117px]">
            <div className="flex items-center gap-9 mb-3">
              <h1 className="text-3xl font-medium text-theme-700 max-lg:text-lg">
                Projetos futuros
              </h1>
              <Link
                className="text-xl font-semibold uppercase underline text-theme-500 max-lg:text-sm"
                href="/projetos/futuros"
              >
                Ver Tudo
              </Link>
            </div>
            {!!undisponibleProjects.data &&
            undisponibleProjects.data.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[34px]">
                  {undisponibleProjects.data.map((project) => {
                    return <ProjectsCard key={project.id} project={project} />;
                  })}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center text-center">
                <p>Nenhum projeto dessa categoria cadastrado.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
