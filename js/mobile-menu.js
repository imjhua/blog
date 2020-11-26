
    function inViewPort(el) {
      return el.classList.contains("show");
    }
    function show(el) {
      if (!el.classList.contains("show")) {
        el.classList.remove("hide");
        el.classList.add("show");
      }
    }
    function hide(el) {
      if (el.classList.contains("show")) {
        el.classList.remove("show");
        el.classList.add("hide");
      }
    }

    let rAFId = 0;

    const defaultHeader = document.querySelector("header");
    const mobileHeader = document.querySelector(".mobile");
    const headerHeight = defaultHeader.offsetHeight;
    const checkViewPort = function () {
      if (
        mobileHeader.classList.contains("hide") &&
        window.pageYOffset >= headerHeight
      ) {
        // show header
        show(mobileHeader);
      }
      if (
        mobileHeader.classList.contains("show") &&
        window.pageYOffset < headerHeight
      ) {
        hide(mobileHeader);
      }

      /*
          const targets = document.querySelectorAll(".entry > h2");
          for (const target of targets) {
            const { top } = target.getBoundingClientRect();
            // 뷰포트에 없고
            // 브라우저 창 전체 높이에서 30을 제외한 위치에서
            // 엘리먼트의 top이 들어 오는 경우
            // 뷰포트 안에 들어오면 뷰포트를 체크하여 로직이 계속 실행되는 것을 막는다.
            if (!inViewPort(target) && top < window.innerHeight - 100) {
              show(target);
            }
     */
      if (rAFId) {
        cancelAnimationFrame(rAFId);
      }
      rAFId = requestAnimationFrame(checkViewPort);
    };

    requestAnimationFrame(checkViewPort);

    // const title = document.querySelector("h2.title");
    // setTimeout(() => {
    //   title.classList.add("show");
    // }, 1000);
